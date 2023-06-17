package main

import (
	"bufio"
	_ "embed"
	"fmt"
	"git.sr.ht/~m15o/htmlb"
	"git.sr.ht/~m15o/htmlj"
	"html/template"
	"log"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"sort"
	"strings"
	"time"
)

//go:embed tpl.html
var tpl string

////go:embed tpl-blog.html
var tplBlog string

type Entry struct {
	URL       string
	Author    string
	Published time.Time
	Title     string
	Body      template.HTML
}

type BlogEntry struct {
	URL       string
	Author    string
	Published time.Time
	Title     string
	Href      string
}

func (b BlogEntry) FullPath() string {
	rv, _ := resolveLink(b.URL, b.Href)
	return rv
}

func (b BlogEntry) PublishedStr() string {
	return b.Published.Format("2006-01-02")
}

type Journal struct {
	URL string
	J   *htmlj.Journal
}

type Blog struct {
	URL string
	B   *htmlb.Blog
}

func processJournals(input, output string) {
	var urls []string
	f, err := os.Open(input)
	if err != nil {
		log.Fatal(err)
	}

	s := bufio.NewScanner(f)
	for s.Scan() {
		urls = append(urls, s.Text())
	}

	buildJournals(urls, output)
}

func processBlogs(input, output string) {
	var urls []string
	f, err := os.Open(input)
	if err != nil {
		log.Fatal(err)
	}

	s := bufio.NewScanner(f)
	for s.Scan() {
		urls = append(urls, s.Text())
	}

	buildBlogs(urls, output)
}

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Usage: kiosk INPUT_JOURNAL_FILE OUTPUT_JOURNAL_FILE INPUT_BLOG_FILE OUTPUT_BLOG_FILE")
		return
	}

	processJournals(os.Args[1], os.Args[2])
//	processBlogs(os.Args[3], os.Args[4])
}

var client = http.Client{
	Timeout: 30 * time.Second,
}

func fetchJournal(u string) (*htmlj.Journal, error) {
	r, err := client.Get(u)
	if err != nil {
		return nil, err
	}
	return htmlj.Parse(r.Body)
}

func fetchBlog(u string) (*htmlb.Blog, error) {
	r, err := client.Get(u)
	if err != nil {
		return nil, err
	}
	return htmlb.Parse(r.Body)
}

func resolveLink(b, l string) (string, error) {
	u, err := url.Parse(l)
	if err != nil {
		return l, err
	}
	base, err := url.Parse(b)
	return base.ResolveReference(u).String(), err
}

var are = regexp.MustCompile(`<a [^<>]*>`)
var ire = regexp.MustCompile(`<img [^<>]*>`)
var hre = regexp.MustCompile(`href="([^"]+)"`)
var sre = regexp.MustCompile(`src="([^"]+)"`)

func processContent(u, content string) (string, error) {
	rv := are.ReplaceAllStringFunc(content, func(s string) string {
		matches := hre.FindStringSubmatch(s)
		if len(matches) > 1 {
			l, err := resolveLink(u, matches[1])
			if err != nil {
				return s
			}
			return strings.Replace(s, matches[0], "href=\""+l+"\"", 1)
		}
		return s
	})
	rv = ire.ReplaceAllStringFunc(rv, func(s string) string {
		matches := sre.FindStringSubmatch(s)
		if len(matches) > 1 {
			l, err := resolveLink(u, matches[1])
			if err != nil {
				return s
			}
			return strings.Replace(s, matches[0], "src=\""+l+"\"", 1)
		}
		return s
	})
	return rv, nil
}

func buildJournals(urls []string, dst string) {
	var journals []Journal
	for _, u := range urls {
		fmt.Print("Fetching: ", u)
		j, err := fetchJournal(u)
		if err != nil {
			log.Println("Error fetching journal:", err)
			continue
		}
		fmt.Printf(" - %d entries found\n", len(j.Entries))
		journals = append(journals, Journal{
			URL: u,
			J:   j,
		})
	}

	var entries []Entry

	lastPeriod := time.Now().AddDate(0, -3, 0)

	for _, j := range journals {
		for _, e := range j.J.Entries {
			if !e.Published.After(lastPeriod) {
				continue
			}
			c, err := processContent(j.URL, e.Content)
			if err != nil {
				continue
			}
			entries = append(entries, Entry{
				URL:       j.URL,
				Author:    j.J.Title,
				Published: e.Published,
				Title:     e.Title,
				Body:      template.HTML(c),
			})
		}
	}

	sort.Slice(entries, func(i, j int) bool {
		return entries[i].Published.After(entries[j].Published)
	} )

	t := template.Must(template.New("").Parse(tpl))

	f, err := os.Create(dst)
	if err != nil {
		log.Fatal(err)
	}
	t.Execute(f, entries)
}

func buildBlogs(urls []string, dst string) {
	var blogs []Blog
	for _, u := range urls {
		fmt.Print("Fetching: ", u)
		b, err := fetchBlog(u)
		if err != nil {
			log.Println("Error fetching journal:", err)
			continue
		}
		fmt.Printf(" - %d entries found\n", len(b.Entries))
		blogs = append(blogs, Blog{
			URL: u,
			B:   b,
		})
	}

	var entries []BlogEntry

	lastMonth := time.Now().AddDate(0, -1, 0)

	for _, b := range blogs {
		for _, e := range b.B.Entries {
			if !e.Published.After(lastMonth) {
				continue
			}
			entries = append(entries, BlogEntry{
				URL:       b.URL,
				Author:    b.B.Title,
				Published: e.Published,
				Title:     e.Title,
				Href:      e.Href,
			})
		}
	}

	sort.Slice(entries, func(i, j int) bool {
		return entries[i].Published.After(entries[j].Published)
	})

	t := template.Must(template.New("").Parse(tplBlog))

	f, err := os.Create(dst)
	if err != nil {
		log.Fatal(err)
	}
	t.Execute(f, entries)
}
