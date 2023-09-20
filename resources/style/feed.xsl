<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Owen - Feed</title>
    <link rel="shortcut icon" type="image/jpg" href="/resources/image/1.png"/>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="/resources/style/main.css"/>
    <link rel="stylesheet" href="/resources/style/mobile.css" media="screen and (max-device-width: 480px)"/>
    <script type="text/javascript" src="/resources/script/hide.js"></script>
</head>
<body>
    <main style="margin-top: 80px">
        <xsl:value-of select="*/*[name()='title']"/> | <i><xsl:value-of select="*/*[name()='author']"/></i><br/><br/>
        <xsl:for-each select="*/*[name()='entry']">
          <div><xsl:attribute name="id"><xsl:value-of select="substring-after(*[name()='id'], 'feed.xml#')"/></xsl:attribute>
            [<xsl:value-of select="substring(*[name()='updated'], 0, 11)"/>] 
            <a><xsl:attribute name="href"><xsl:value-of select="*[name()='link']/@*[name()='href']"/></xsl:attribute>
            <xsl:value-of select="*[name()='title']"/>: </a>  
            <i><xsl:value-of select="*[name()='summary']"/></i> 
            <a class="hider" onclick="toggle(this, this.nextElementSibling, ' (show)', ' (hide)')"> (hide)</a>
            <div class="indent">
                <xsl:copy-of select="*[name()='content']"/>
            </div>
          </div>
        </xsl:for-each>
        <br/>
        <a href="https://owencompher.me">homepage</a>
    </main>
    <script type="text/javascript">
        for(el of document.getElementsByClassName("hider")) if(window.location.hash.substr(1,4)!=el.parentElement.id) toggle(el, el.nextElementSibling, ' (show)', ' (hide)');
    </script>
</body>
</html>
</xsl:template>

</xsl:stylesheet> 
