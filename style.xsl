<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Owen - Feed</title>
    <link rel="shortcut icon" type="image/jpg" href="/resources/1.png"/>
    <link rel="stylesheet" href="/style.css" media="screen and (min-device-width: 481px)"/>
    <link rel="stylesheet" href="/mobile_style.css" media="screen and (max-device-width: 480px)"/>
    <script type="text/javascript" src="/scripts/hide.js"></script>
</head>
<body>
    <main style="margin-top: 80px">
        <xsl:value-of select="*/*[name()='title']"/> | <i><xsl:value-of select="*/*[name()='author']"/></i><br/>
        <xsl:for-each select="*/*[name()='entry']">
          <div><xsl:attribute name="id"><xsl:value-of select="substring-after(*[name()='id'], 'feed.xml#')"/></xsl:attribute>
            [<xsl:value-of select="substring(*[name()='updated'], 0, 11)"/>] 
            <a><xsl:attribute name="href"><xsl:value-of select="*[name()='link']/@*[name()='href']"/></xsl:attribute>
            <xsl:value-of select="*[name()='title']"/>: </a>  
            <i><xsl:value-of select="*[name()='summary']"/></i> 
            <a class="link" onclick="toggle(this, this.nextElementSibling, ' (show)', ' (hide)')"> (show)</a>
            <div hidden="">
                <xsl:copy-of select="*[name()='content']"/>
            </div>
          </div>
        </xsl:for-each>
    </main>
</body>
</html>
</xsl:template>

</xsl:stylesheet> 
