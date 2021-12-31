<!-- XSL copied from the first Mikhail Timofeev's CA and rearanged for use in this CA -->
<?xml version = "1.0" encoding = "UTF-8"?>
<xsl:stylesheet  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="html" doctype-public="XSLT-compat" omit-xml-declaration="yes" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<table id="storeTable" border="1" class="indent">
			<thead>
				<tr>
					<th colspan="3">Diesel Records</th>
				</tr>
				<tr>
					<th>Select</th>
					<th>Item</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				<xsl:for-each select="/store/section">
					<tr>
						<td colspan="3">
							<xsl:value-of select="@name"/>
						</td>
					</tr>
					<xsl:for-each select="option">
						<tr id="{position()}">
							<td align="center">
								<input name="item0" type="checkbox"/>
							</td>
							<td>
								<xsl:value-of select="item"/>
							</td>
							<td align="right">
								<xsl:value-of select="price"/>
							</td>
						</tr>
					</xsl:for-each>
				</xsl:for-each>
			</tbody>
		</table>
	</xsl:template>
</xsl:stylesheet>