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
</head>
<body>
    <main style="margin-top: 80px">
        <xsl:for-each select="*/*[name()='entry']">
            [<xsl:value-of select="*[name()='updated']"/>] 
            <xsl:value-of select="*[name()='title']"/>: 
            <xsl:value-of select="*[name()='title']"/>
            <div><xsl:value-of select="*[name()='content']"/></div>
        </xsl:for-each>
    </main>
</body>
</html>
</xsl:template>

</xsl:stylesheet> 