<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Owen - Sitemap</title>
    <link rel="shortcut icon" type="image/jpg" href="/resources/image/1.png"/>
    <link rel="stylesheet" href="/resources/style/main.css" media="screen and (min-device-width: 481px)"/>
    <link rel="stylesheet" href="/resources/style/mobile.css" media="screen and (max-device-width: 480px)"/>
</head>
<body>
    <main style="margin-top: 80px">
        <p class="title">Sitemap</p>
        <xsl:for-each select="*/*[name()='url']">
            <a><xsl:attribute name="href"><xsl:value-of select="*[name()='loc']"/></xsl:attribute>
            <xsl:value-of select="*[name()='loc']"/></a><br/>
        </xsl:for-each>
    </main>
</body>
</html>
</xsl:template>

</xsl:stylesheet> 
