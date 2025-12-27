<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap - anselmelly.com</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                        background: #f5f5f5;
                        color: #333;
                        line-height: 1.6;
                    }

                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 20px;
                    }

                    header {
                        background: #fff;
                        padding: 30px;
                        margin-bottom: 30px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }

                    h1 {
                        font-size: 28px;
                        margin-bottom: 10px;
                        color: #2c3e50;
                    }

                    .description {
                        color: #7f8c8d;
                        font-size: 14px;
                    }

                    .stats {
                        background: #3498db;
                        color: white;
                        padding: 15px 30px;
                        border-radius: 8px;
                        margin-bottom: 30px;
                        display: inline-block;
                    }

                    table {
                        width: 100%;
                        background: #fff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        border-collapse: collapse;
                    }

                    thead {
                        background: #34495e;
                        color: white;
                    }

                    th {
                        padding: 15px;
                        text-align: left;
                        font-weight: 600;
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    td {
                        padding: 15px;
                        border-bottom: 1px solid #ecf0f1;
                        font-size: 14px;
                    }

                    tr:hover {
                        background: #f8f9fa;
                    }

                    tr:last-child td {
                        border-bottom: none;
                    }

                    a {
                        color: #3498db;
                        text-decoration: none;
                        word-break: break-all;
                    }

                    a:hover {
                        text-decoration: underline;
                    }

                    .priority {
                        display: inline-block;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-weight: 600;
                        font-size: 12px;
                    }

                    .priority-high {
                        background: #27ae60;
                        color: white;
                    }

                    .priority-medium {
                        background: #f39c12;
                        color: white;
                    }

                    .priority-low {
                        background: #95a5a6;
                        color: white;
                    }

                    footer {
                        text-align: center;
                        margin-top: 30px;
                        padding: 20px;
                        color: #7f8c8d;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>XML Sitemap</h1>
                        <p class="description">This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs for anselmelly.com</p>
                    </header>

                    <div class="stats">
                        Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th style="width: 50%;">URL</th>
                                <th>Last Modified</th>
                                <th>Change Frequency</th>
                                <th>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="sitemap:urlset/sitemap:url">
                                <tr>
                                    <td>
                                        <a href="{sitemap:loc}">
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                    </td>
                                    <td>
                                        <xsl:value-of select="sitemap:lastmod"/>
                                    </td>
                                    <td>
                                        <xsl:value-of select="sitemap:changefreq"/>
                                    </td>
                                    <td>
                                        <xsl:choose>
                                            <xsl:when test="sitemap:priority &gt;= 0.8">
                                                <span class="priority priority-high">
                                                    <xsl:value-of select="sitemap:priority"/>
                                                </span>
                                            </xsl:when>
                                            <xsl:when test="sitemap:priority &gt;= 0.5">
                                                <span class="priority priority-medium">
                                                    <xsl:value-of select="sitemap:priority"/>
                                                </span>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <span class="priority priority-low">
                                                    <xsl:value-of select="sitemap:priority"/>
                                                </span>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>

                    <footer>
                        Generated from XML Sitemap for anselmelly.com
                    </footer>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
