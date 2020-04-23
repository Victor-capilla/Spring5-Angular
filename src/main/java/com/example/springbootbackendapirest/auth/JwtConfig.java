package com.example.springbootbackendapirest.auth;

public class JwtConfig {
	
	protected static final String KEY = "clave.secreta.12345678";
	
	protected static final String KEY_CLIENT = "12345";
	
	protected static final String KEY_PUBLIC = "-----BEGIN PUBLIC KEY-----\r\n" + 
			"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwRFBMEzlPAaACBa76iFw\r\n" + 
			"vYhnaVDzLcdGamZr4k3PBHclnzv1H/owEzttE5y4wndn+yt1PGDtzUaIrvW5pM/C\r\n" + 
			"/cqJDNoQBsBHQjNM/qAV/2nEmuMVbZjTs2HoZ8GVYRfxJwbaReVxclMY8rRCHl6c\r\n" + 
			"I6G9eD2nXbg72ZijsaF+rHV1tGihszPTu4dRN6Q1ZeeNoiW/pzxR8898niiqnLf7\r\n" + 
			"eh3vT4bwhiLO2W2SsxJGyv06QumI52mHeTtfrbAxCjjIDkXntYgz8s2nHIA4LaEW\r\n" + 
			"2lhMLdMi1NgXOr2URkpxybC8mJhZiGNmXfW8pWd9KES3l8qivbj8t0naWIuu4PX8\r\n" + 
			"lQIDAQAB\r\n" + 
			"-----END PUBLIC KEY-----";
	
	protected static final String KEY_PRIVATE = "-----BEGIN RSA PRIVATE KEY-----\r\n" + 
			"MIIEpAIBAAKCAQEAwRFBMEzlPAaACBa76iFwvYhnaVDzLcdGamZr4k3PBHclnzv1\r\n" + 
			"H/owEzttE5y4wndn+yt1PGDtzUaIrvW5pM/C/cqJDNoQBsBHQjNM/qAV/2nEmuMV\r\n" + 
			"bZjTs2HoZ8GVYRfxJwbaReVxclMY8rRCHl6cI6G9eD2nXbg72ZijsaF+rHV1tGih\r\n" + 
			"szPTu4dRN6Q1ZeeNoiW/pzxR8898niiqnLf7eh3vT4bwhiLO2W2SsxJGyv06QumI\r\n" + 
			"52mHeTtfrbAxCjjIDkXntYgz8s2nHIA4LaEW2lhMLdMi1NgXOr2URkpxybC8mJhZ\r\n" + 
			"iGNmXfW8pWd9KES3l8qivbj8t0naWIuu4PX8lQIDAQABAoIBAQCoIg+kMYL8WCjN\r\n" + 
			"Yob5aW/WDuEHzVBJUJ5Y8KMJLHuZRu2Dk2JwG6AcT4c5KiWYbQYnrPvmvf654rAL\r\n" + 
			"tcCa77e+7s+VWp3UU0R7OVPW9rDRglmODS5PCGVsdVpAaUxehswjEYuqjRrT1dwH\r\n" + 
			"GMXvzrKpMSRgf0iujE/KumvruFkpc4hVfjGRqy43AzWmaIQ/uVb/gIZQt4y+u1Mb\r\n" + 
			"RMPW+AGsnqsi5iECDTGdwasV3gD0pRiRMtn+8NGmt3KJKz9Nms/DmcfbY71Q5sI1\r\n" + 
			"Isc3Ea9NWLm26tpfUCbMcddQ6I0J7AzqwpmTOC+wmZZ3JWAolHGOuRK9Na4swZ3N\r\n" + 
			"+E/xBTKtAoGBAPPJXg9DLJcEJsH6mtVrTvojspBpe8y6byYbv7PFJ6OfcmNPdJiU\r\n" + 
			"14z5edTlwPcQpATysNzcmZuKduyzNN/ywY+7vsYkTdufvGsvUPHCQTzg/31V7KtU\r\n" + 
			"4JEIizfwZvRy7oYaobBYgKTfrBeAbuLRXAjBST92Q8hDuMWxJSIijfWbAoGBAMq9\r\n" + 
			"Zi3EGvS0m5S+a23bHBikSYGZHOtW4aspSdyEl5EAPAemKLDMlp6ScRIuN5VgJ3V0\r\n" + 
			"V1IKvJ0KIynZTbXyy95PcaJ3Q2TAOchJZtuMimBtHfsIDcory2CorGTRlLc9aSim\r\n" + 
			"k8bi4UtBxdR0Oc+9R0WwPvOEfpGgXTr/Z75J95GPAoGBAMDq+0osqF6hZGJhBKIb\r\n" + 
			"FxaPpUDumI98gXSwxNVoEWRES2sXd3c/YgwnaCf34Ooi+wkHXLqKv+v8ePv7HL6U\r\n" + 
			"BmTN97wpAovoLlzLxsxqIuIgU05F7tHuiv96uWD9Fxwez27EKGu6vaK7dh3q/tTz\r\n" + 
			"RFeRTXuxBRa3sMKQ2ofWvGw9AoGAWIlVse7OBsdImjB+Ib9qCajVIO+InY2Xh3PE\r\n" + 
			"ebS9q+j6TizV4D+4Fw/EqTfdtjIDiVuBNqbRr5LZwFDRiv+44CC5c0W5/Kmlkj3b\r\n" + 
			"2U0KsQl16kaeHwf5DQEcJ/sOgucioUn9hwFVedQDXMBU7s+t7FUHaLkXvOjXTghz\r\n" + 
			"ebo7jykCgYBdRPd1nbRISP1QuEuVJGaaFMXpqVhx2b26+yPvZGzWZDVFW06vDZ96\r\n" + 
			"TXbyNG7jzsac/DrjHfOPHZK8ZsbyFW/eyLoTENJ5iaW2odu/88/K8CZvHZi4D+bz\r\n" + 
			"BEjZRI14mNwEBpFw9/VMzvDrsEEZ4KUv/gTGCmGghQIgwJyvrc5KhQ==\r\n" + 
			"-----END RSA PRIVATE KEY-----";

}
