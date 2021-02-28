package com.greenbooks.functions;

import java.text.DecimalFormat;
import org.apache.commons.lang3.math.NumberUtils;

public class GridFormat {

	public static String formatCurrency(String str) {
		if (str != "") {
			if ( NumberUtils.isNumber(str)) {
				if(Double.valueOf(str) == 0.0) {
					str = " - ";
				} else {
					double dub = Double.valueOf(str) * 100;
			        Double penniesAsDouble = new Double(dub); 
			        int penniesAsInt = penniesAsDouble.intValue();
			        String pennies = String.valueOf(penniesAsInt);
					String strLeft = String.valueOf(pennies).substring(0,(pennies.length() - 2));
					String strRight = String.valueOf(pennies).substring(pennies.length() - 2);
					str = strLeft + "." + strRight;
					str = "$" + formatNumber(str);
				}
			}
		}
		return str;	
	}
	
	public static String formatNumber(String str1) {	
		double amount = Double.parseDouble(str1);
		DecimalFormat formatter = new DecimalFormat("#,###.00");
		str1 = (formatter.format(amount));
		return str1;
	}
}