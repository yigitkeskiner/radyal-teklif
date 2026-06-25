import { useState, useCallback, useEffect } from "react";

// ─── VERİ ───────────────────────────────────────────────────────────────────
const RADYATOR_DATA = {
  KN:   { ad:"Konak",          tip:"Radyatör", dw:80,  depth:36,  v:[{h:300,ax:275,w:66,p:664.57},{h:375,ax:350,w:81,p:739.60},{h:450,ax:425,w:96,p:830.87},{h:525,ax:500,w:110,p:938.67},{h:600,ax:575,w:123,p:1018.51},{h:750,ax:725,w:151,p:1176.01},{h:825,ax:800,w:162,p:1277.08},{h:900,ax:875,w:173,p:1356.70},{h:1000,ax:975,w:189,p:1462.36},{h:1250,ax:1225,w:231,p:1764.02},{h:1500,ax:1475,w:271,p:2033.53},{h:1750,ax:1725,w:308,p:2304.56},{h:2000,ax:1975,w:336,p:2633.78}]},
  KNL:  { ad:"Konak Line",     tip:"Radyatör", dw:80,  depth:36,  v:[{h:300,ax:275,w:69,p:634.93},{h:375,ax:350,w:85,p:712.26},{h:450,ax:425,w:100,p:802.61},{h:525,ax:500,w:115,p:914.13},{h:600,ax:575,w:128,p:1003.35},{h:750,ax:725,w:157,p:1148.56},{h:825,ax:800,w:169,p:1250.31},{h:900,ax:875,w:181,p:1329.27},{h:1000,ax:975,w:197,p:1434.28},{h:1250,ax:1225,w:241,p:1737.91},{h:1500,ax:1475,w:282,p:2005.71},{h:1750,ax:1725,w:322,p:2275.15},{h:2000,ax:1975,w:351,p:2600.17}]},
  MH:   { ad:"Mahal",          tip:"Radyatör", dw:100, depth:36,  v:[{h:300,ax:275,w:57,p:811.38},{h:375,ax:350,w:70,p:916.13},{h:450,ax:425,w:82,p:1039.77},{h:525,ax:500,w:94,p:1184.87},{h:600,ax:575,w:106,p:1279.19},{h:750,ax:725,w:130,p:1506.85},{h:825,ax:800,w:140,p:1648.52},{h:900,ax:875,w:149,p:1751.55},{h:1000,ax:975,w:162,p:1897.51},{h:1250,ax:1225,w:198,p:2331.11},{h:1500,ax:1475,w:233,p:2700.31},{h:1750,ax:1725,w:265,p:3069.51},{h:2000,ax:1975,w:289,p:3508.01}]},
  YL:   { ad:"Yalı",           tip:"Radyatör", dw:40,  depth:36,  v:[{h:300,ax:275,w:37,p:411.98},{h:375,ax:350,w:45,p:467.01},{h:450,ax:425,w:53,p:526.14},{h:525,ax:500,w:61,p:596.68},{h:600,ax:575,w:68,p:652.11},{h:750,ax:725,w:83,p:812.40},{h:825,ax:800,w:90,p:831.28},{h:900,ax:875,w:96,p:886.90},{h:1000,ax:975,w:104,p:961.68},{h:1250,ax:1225,w:127,p:1156.19},{h:1500,ax:1475,w:153,p:1343.52}]},
  VL:   { ad:"Villa",          tip:"Radyatör", dw:40,  depth:60,  v:[{h:290,ax:250,w:38,p:557.52},{h:390,ax:350,w:50,p:654.86},{h:450,ax:410,w:56,p:719.12},{h:540,ax:500,w:66,p:829.78},{h:600,ax:560,w:72,p:888.98},{h:750,ax:710,w:88,p:1037.78},{h:840,ax:800,w:97,p:1144.20},{h:900,ax:860,w:102,p:1204.39},{h:1000,ax:960,w:111,p:1304.23},{h:1250,ax:1210,w:135,p:1565.68},{h:1500,ax:1460,w:159,p:1818.18},{h:1750,ax:1710,w:181,p:2068.97},{h:2000,ax:1960,w:197,p:2364.53}]},
  KS:   { ad:"Köşk",           tip:"Radyatör", dw:80,  depth:60,  v:[{h:300,ax:260,w:69,p:996.60},{h:375,ax:335,w:84,p:1112.80},{h:450,ax:410,w:99,p:1247.00},{h:525,ax:485,w:113,p:1409.55},{h:600,ax:560,w:127,p:1516.31},{h:750,ax:710,w:155,p:1766.31},{h:825,ax:785,w:168,p:1885.51},{h:900,ax:860,w:179,p:2037.88},{h:1000,ax:960,w:195,p:2197.76},{h:1250,ax:1210,w:238,p:2655.72},{h:1500,ax:1460,w:279,p:3064.99},{h:1750,ax:1710,w:318,p:3471.77},{h:2000,ax:1960,w:347,p:3967.74}]},
  SR:   { ad:"Saray",          tip:"Radyatör", dw:40,  depth:80,  v:[{h:290,ax:250,w:46,p:607.00},{h:390,ax:350,w:61,p:727.31},{h:450,ax:410,w:69,p:805.61},{h:540,ax:500,w:82,p:937.24},{h:600,ax:560,w:89,p:1009.29},{h:750,ax:710,w:109,p:1193.83},{h:840,ax:800,w:120,p:1321.44},{h:900,ax:860,w:126,p:1395.39},{h:1000,ax:960,w:137,p:1518.65},{h:1250,ax:1210,w:167,p:1838.35},{h:1500,ax:1460,w:196,p:2148.13},{h:1750,ax:1710,w:223,p:2457.28},{h:2000,ax:1960,w:243,p:2808.32}]},
  MKE:  { ad:"Mekan Elite",    tip:"Radyatör", dw:50,  depth:50,  v:[{h:300,ax:255,w:41,p:569.95},{h:375,ax:330,w:50,p:647.96},{h:450,ax:405,w:58,p:733.93},{h:525,ax:480,w:66,p:832.64},{h:600,ax:555,w:74,p:901.76},{h:750,ax:705,w:89,p:1066.67},{h:825,ax:780,w:96,p:1163.79},{h:900,ax:855,w:103,p:1241.80},{h:1000,ax:955,w:112,p:1346.87},{h:1250,ax:1205,w:135,p:1609.56},{h:1500,ax:1455,w:155,p:1910.46},{h:1750,ax:1705,w:177,p:2176.33}]},
  ST:   { ad:"Suit",           tip:"Radyatör", dw:80,  depth:70,  v:[{h:300,ax:260,w:70,p:1064.36},{h:375,ax:335,w:86,p:1198.95},{h:450,ax:410,w:101,p:1351.40},{h:525,ax:485,w:116,p:1529.86},{h:600,ax:560,w:129,p:1669.29},{h:750,ax:710,w:159,p:1942.10},{h:825,ax:785,w:171,p:2109.75},{h:900,ax:860,w:183,p:2248.42},{h:1000,ax:960,w:198,p:2433.30},{h:1250,ax:1210,w:243,p:2949.58},{h:1500,ax:1460,w:285,p:3419.63},{h:1750,ax:1710,w:325,p:3886.55},{h:2000,ax:1960,w:354,p:4441.77}]},
  KR:   { ad:"Kasır",          tip:"Radyatör", dw:80,  depth:105, v:[{h:300,ax:255,w:76,p:1370.05},{h:375,ax:330,w:93,p:1564.58},{h:450,ax:405,w:110,p:1758.79},{h:525,ax:480,w:125,p:2031.38},{h:600,ax:555,w:141,p:2221.51},{h:750,ax:705,w:172,p:2627.56},{h:825,ax:780,w:185,p:2864.43},{h:900,ax:855,w:198,p:3065.10},{h:1000,ax:955,w:215,p:3331.86},{h:1250,ax:1205,w:263,p:4071.58},{h:1500,ax:1455,w:309,p:4750.70},{h:1750,ax:1705,w:352,p:5426.67},{h:2000,ax:1955,w:384,p:6201.91}]},
  RS:   { ad:"Residence",      tip:"Radyatör", dw:100, depth:36,  v:[{h:300,ax:265,w:64,p:1179.44},{h:375,ax:340,w:79,p:1318.20},{h:450,ax:415,w:93,p:1475.57},{h:525,ax:490,w:106,p:1660.02},{h:600,ax:565,w:119,p:1793.17},{h:750,ax:715,w:146,p:2083.06},{h:825,ax:790,w:157,p:2260.74},{h:900,ax:865,w:168,p:2402.88},{h:1000,ax:965,w:183,p:2592.40},{h:1250,ax:1215,w:223,p:3135.59},{h:1500,ax:1465,w:262,p:3614.47},{h:1750,ax:1715,w:299,p:4095.05},{h:2000,ax:1965,w:326,p:4680.05}]},
  MS:   { ad:"Mesken",         tip:"Radyatör", dw:100, depth:50,  v:[{h:300,ax:255,w:83,p:976.80},{h:375,ax:330,w:91,p:1115.12},{h:450,ax:405,w:107,p:1270.56},{h:525,ax:480,w:123,p:1450.23},{h:600,ax:555,w:137,p:1582.78},{h:750,ax:705,w:168,p:1872.33},{h:825,ax:780,w:181,p:2046.30},{h:900,ax:855,w:193,p:2188.90},{h:1000,ax:955,w:210,p:2377.13},{h:1250,ax:1205,w:257,p:2914.73},{h:1500,ax:1455,w:301,p:3392.43},{h:1750,ax:1705,w:343,p:3872.99},{h:2000,ax:1955,w:383,p:4426.28}]},
  MSF:  { ad:"Mesken Flat",    tip:"Radyatör", dw:100, depth:50,  v:[{h:300,ax:255,w:83,p:1003.23},{h:375,ax:330,w:91,p:1145.29},{h:450,ax:405,w:107,p:1304.93},{h:525,ax:480,w:123,p:1489.46},{h:600,ax:555,w:137,p:1625.60},{h:750,ax:705,w:168,p:1922.98},{h:825,ax:780,w:181,p:2101.65},{h:900,ax:855,w:193,p:2248.11},{h:1000,ax:955,w:210,p:2441.43},{h:1250,ax:1205,w:257,p:2993.57},{h:1500,ax:1455,w:301,p:3484.20},{h:1750,ax:1705,w:343,p:3977.76},{h:2000,ax:1955,w:383,p:4546.01}]},
  MSL:  { ad:"Mesken Line",    tip:"Radyatör", dw:100, depth:50,  v:[{h:300,ax:255,w:70,p:1027.98},{h:375,ax:330,w:86,p:1166.85},{h:450,ax:405,w:101,p:1322.91},{h:525,ax:480,w:116,p:1481.83},{h:600,ax:555,w:130,p:1644.86},{h:750,ax:705,w:159,p:1925.66},{h:825,ax:780,w:172,p:2098.90},{h:900,ax:855,w:183,p:2242.08},{h:1000,ax:955,w:199,p:2431.06},{h:1250,ax:1205,w:244,p:2969.39},{h:1500,ax:1455,w:286,p:3450.45},{h:1750,ax:1705,w:326,p:3931.51},{h:2000,ax:1955,w:362,p:4493.15}]},
  HA:   { ad:"Hane",           tip:"Radyatör", dw:70,  depth:65,  v:[{h:300,ax:265,w:56,p:984.20},{h:375,ax:340,w:70,p:1116.66},{h:450,ax:415,w:82,p:1258.36},{h:525,ax:490,w:92,p:1413.92},{h:600,ax:565,w:106,p:1549.73},{h:750,ax:715,w:120,p:1811.30},{h:825,ax:790,w:131,p:1976.10},{h:900,ax:865,w:139,p:2108.56},{h:1000,ax:965,w:150,p:2285.69},{h:1250,ax:1215,w:178,p:2755.45},{h:1500,ax:1465,w:197,p:3195.96},{h:1800,ax:1765,w:216,p:3745.01},{h:2000,ax:1965,w:232,p:4161.13}]},
  HAL:  { ad:"Hane Line",      tip:"Radyatör", dw:70,  depth:65,  v:[{h:300,ax:270,w:40,p:725.45},{h:375,ax:345,w:50,p:808.27},{h:450,ax:420,w:58,p:898.76},{h:525,ax:495,w:67,p:1004.58},{h:600,ax:570,w:75,p:1078.66},{h:750,ax:720,w:92,p:1249.98},{h:825,ax:795,w:99,p:1363.47},{h:900,ax:870,w:106,p:1446.29},{h:1000,ax:970,w:115,p:1555.18},{h:1250,ax:1220,w:141,p:1857.33},{h:1500,ax:1470,w:165,p:2130.33},{h:1800,ax:1770,w:193,p:2475.26},{h:2000,ax:1970,w:205,p:2750.29}]},
  HAS:  { ad:"Hane Elips",     tip:"Radyatör", dw:70,  depth:50,  v:[{h:300,ax:270,w:41,p:764.75},{h:375,ax:345,w:50,p:849.18},{h:450,ax:420,w:59,p:944.98},{h:525,ax:495,w:67,p:1053.76},{h:600,ax:570,w:75,p:1139.90},{h:750,ax:720,w:92,p:1308.68},{h:825,ax:795,w:99,p:1427.21},{h:900,ax:870,w:106,p:1513.26},{h:1000,ax:970,w:115,p:1625.30},{h:1250,ax:1220,w:141,p:1938.66},{h:1500,ax:1470,w:165,p:2222.81},{h:1800,ax:1770,w:194,p:2580.56},{h:2000,ax:1970,w:205,p:2867.29}]},
  TW:   { ad:"Tower",          tip:"Radyatör", dw:95,  depth:80,  v:[{h:300,ax:270,w:82,p:1427.04},{h:375,ax:345,w:102,p:1643.99},{h:450,ax:420,w:119,p:1881.84},{h:525,ax:495,w:137,p:2138.96},{h:600,ax:570,w:154,p:2362.95},{h:750,ax:720,w:189,p:2793.02},{h:825,ax:795,w:204,p:3040.51},{h:900,ax:870,w:220,p:3259.06},{h:1000,ax:970,w:241,p:3549.94},{h:1250,ax:1220,w:291,p:4327.74},{h:1500,ax:1470,w:342,p:5055.72},{h:1800,ax:1770,w:407,p:5952.51},{h:2000,ax:1970,w:437,p:6613.90}]},
  TWR:  { ad:"Tower Round",    tip:"Radyatör", dw:95,  depth:57,  v:[{h:300,ax:270,w:59,p:1037.72},{h:375,ax:345,w:72,p:1167.67},{h:450,ax:420,w:85,p:1312.92},{h:525,ax:495,w:97,p:1475.36},{h:600,ax:570,w:109,p:1603.09},{h:750,ax:720,w:133,p:1863.31},{h:825,ax:795,w:144,p:2020.02},{h:900,ax:870,w:153,p:2149.97},{h:1000,ax:970,w:167,p:2321.97},{h:1250,ax:1220,w:204,p:2799.74},{h:1500,ax:1470,w:239,p:3233.56},{h:1800,ax:1770,w:281,p:3757.20},{h:2000,ax:1970,w:297,p:4174.66}]},
  TWB:  { ad:"Tower Bold",     tip:"Radyatör", dw:95,  depth:70,  v:[{h:300,ax:270,w:82,p:1472.93},{h:375,ax:345,w:101,p:1685.82},{h:450,ax:420,w:119,p:1914.05},{h:525,ax:495,w:136,p:2157.62},{h:600,ax:570,w:152,p:2380.23},{h:750,ax:720,w:186,p:2800.11},{h:825,ax:795,w:201,p:3034.09},{h:900,ax:870,w:214,p:3248.89},{h:1000,ax:970,w:233,p:3534.65},{h:1250,ax:1220,w:285,p:4282.63},{h:1500,ax:1470,w:335,p:4999.92},{h:1800,ax:1770,w:392,p:5861.04},{h:2000,ax:1970,w:416,p:6512.27}]},
  TWF:  { ad:"Tower Flat",     tip:"Radyatör", dw:95,  depth:70,  v:[{h:300,ax:270,w:82,p:1472.93},{h:375,ax:345,w:101,p:1685.82},{h:450,ax:420,w:119,p:1914.05},{h:525,ax:495,w:136,p:2157.62},{h:600,ax:570,w:152,p:2380.23},{h:750,ax:720,w:186,p:2800.11},{h:825,ax:795,w:201,p:3034.09},{h:900,ax:870,w:214,p:3248.89},{h:1000,ax:970,w:233,p:3534.65},{h:1250,ax:1220,w:285,p:4282.63},{h:1500,ax:1470,w:335,p:4999.92},{h:1800,ax:1770,w:392,p:5861.04},{h:2000,ax:1970,w:416,p:6512.27}]},
  TWL:  { ad:"Tower Line",     tip:"Radyatör", dw:95,  depth:47,  v:[{h:300,ax:270,w:59,p:1039.75},{h:375,ax:345,w:72,p:1166.39},{h:450,ax:420,w:85,p:1307.11},{h:525,ax:495,w:97,p:1465.03},{h:600,ax:570,w:109,p:1590.40},{h:750,ax:720,w:134,p:1848.09},{h:825,ax:795,w:144,p:1998.19},{h:900,ax:870,w:154,p:2126.40},{h:1000,ax:970,w:168,p:2295.26},{h:1250,ax:1220,w:205,p:2759.63},{h:1500,ax:1470,w:240,p:3186.47},{h:1800,ax:1770,w:282,p:4132.12},{h:2000,ax:1970,w:299,p:4591.25}]},
  TWE:  { ad:"Tower Elite",    tip:"Radyatör", dw:95,  depth:47,  v:[{h:300,ax:270,w:60,p:1020.67},{h:375,ax:345,w:73,p:1144.99},{h:450,ax:420,w:86,p:1283.13},{h:525,ax:495,w:99,p:1438.15},{h:600,ax:570,w:111,p:1552.83},{h:750,ax:720,w:136,p:1814.18},{h:825,ax:795,w:146,p:1961.53},{h:900,ax:870,w:156,p:2087.38},{h:1000,ax:970,w:170,p:2253.15},{h:1250,ax:1220,w:208,p:2708.99},{h:1500,ax:1470,w:244,p:3128.01},{h:1800,ax:1770,w:286,p:4056.31},{h:2000,ax:1970,w:303,p:4507.01}]},
  LFT:  { ad:"Loft",           tip:"Radyatör", dw:90,  depth:63,  v:[{h:300,ax:250,w:64,p:1429.43},{h:375,ax:325,w:78,p:1600.08},{h:450,ax:400,w:92,p:1786.79},{h:525,ax:475,w:105,p:1989.56},{h:600,ax:550,w:118,p:2111.50},{h:750,ax:700,w:144,p:2569.76},{h:825,ax:775,w:156,p:2700.26},{h:900,ax:850,w:166,p:2870.91},{h:1000,ax:950,w:181,p:3101.78},{h:1250,ax:1200,w:221,p:3714.11},{h:1500,ax:1450,w:259,p:4286.28},{h:1800,ax:1750,w:304,p:4978.91},{h:2000,ax:1950,w:322,p:5532.13}]},
  LFTE: { ad:"Loft Elite",     tip:"Radyatör", dw:90,  depth:45,  v:[{h:300,ax:250,w:46,p:1085.46},{h:375,ax:325,w:57,p:1189.94},{h:450,ax:400,w:67,p:1309.91},{h:525,ax:475,w:77,p:1445.35},{h:600,ax:550,w:86,p:1554.29},{h:750,ax:700,w:105,p:1762.67},{h:825,ax:775,w:114,p:1888.43},{h:900,ax:850,w:121,p:1996.78},{h:1000,ax:950,w:132,p:2132.23},{h:1250,ax:1200,w:161,p:2525.00},{h:1500,ax:1450,w:189,p:2879.08},{h:1800,ax:1750,w:222,p:3306.69},{h:2000,ax:1950,w:235,p:3674.10}]},
};

const HAVLUPAN_DATA = {
  // t = model tipi (PDF'deki TİP kolonu, ör. "5/5", "5/10")
  ERL:  { ad:"Erguvan Light",      tip:"Havlupan", byH:true,  v:[{h:500,t:"5/5",w:231,p:4084},{h:600,t:"5/6",w:241,p:4371},{h:700,t:"5/7",w:313,p:5212},{h:800,t:"5/8",w:362,p:5854},{h:900,t:"5/9",w:386,p:6319},{h:1000,t:"5/10",w:434,p:6980},{h:1100,t:"5/11",w:506,p:7793},{h:1200,t:"5/12",w:578,p:8633},{h:1500,t:"5/15",w:699,p:10384},{h:1800,t:"5/18",w:868,p:12510}]},
  MNE:  { ad:"Manolya Elite",      tip:"Havlupan", byH:true,  v:[{h:500,t:"5/5",w:237,p:3959},{h:600,t:"5/6",w:316,p:4856},{h:700,t:"5/7",w:356,p:5427},{h:800,t:"5/8",w:370,p:5691},{h:900,t:"5/9",w:435,p:6567},{h:1000,t:"5/10",w:475,p:7130},{h:1100,t:"5/11",w:554,p:8022},{h:1200,t:"5/12",w:576,p:8280},{h:1500,t:"5/15",w:752,p:10611},{h:1800,t:"5/18",w:870,p:12313}]},
  AK:   { ad:"Akasya",             tip:"Havlupan", byH:true,  v:[{h:500,t:"5/5",w:337,p:4092},{h:600,t:"5/6",w:351,p:4399},{h:700,t:"5/7",w:422,p:5186},{h:800,t:"5/8",w:506,p:5977},{h:900,t:"5/9",w:526,p:6284},{h:1000,t:"5/10",w:590,p:6986},{h:1100,t:"5/11",w:675,p:7862},{h:1250,t:"5/12",w:843,p:9134},{h:1500,t:"5/15",w:970,p:10759},{h:1800,t:"5/18",w:1228,p:13150}]},
  VT:   { ad:"Violet",             tip:"Havlupan", byH:true,  v:[{h:500,t:"5/5",w:259,p:3869},{h:600,t:"5/6",w:323,p:4559},{h:700,t:"5/7",w:388,p:5228},{h:800,t:"5/8",w:453,p:5908},{h:900,t:"5/9",w:471,p:6221},{h:1000,t:"5/10",w:517,p:6888},{h:1100,t:"5/11",w:582,p:7570},{h:1200,t:"5/12",w:605,p:7894},{h:1500,t:"5/15",w:776,p:9912},{h:1800,t:"5/18",w:906,p:11575}]},
  VTL:  { ad:"Violet Line",        tip:"Havlupan", byH:true,  v:[{h:500,t:"5/5",w:230,p:3313},{h:600,t:"5/6",w:287,p:3910},{h:700,t:"5/7",w:345,p:4487},{h:800,t:"5/8",w:402,p:5064},{h:900,t:"5/9",w:419,p:5342},{h:1000,t:"5/10",w:460,p:5911},{h:1100,t:"5/11",w:517,p:6496},{h:1200,t:"5/12",w:538,p:6775},{h:1500,t:"5/15",w:690,p:8506},{h:1800,t:"5/18",w:805,p:9948}]},
  VTE:  { ad:"Violet Elite",       tip:"Havlupan", byH:true,  v:[{h:500,t:"5/5",w:210,p:3127},{h:600,t:"5/6",w:262,p:3669},{h:700,t:"5/7",w:314,p:4212},{h:800,t:"5/8",w:367,p:4743},{h:900,t:"5/9",w:382,p:5004},{h:1000,t:"5/10",w:419,p:5563},{h:1100,t:"5/11",w:472,p:6067},{h:1200,t:"5/12",w:491,p:6338},{h:1500,t:"5/15",w:629,p:7923},{h:1800,t:"5/18",w:734,p:9257}]},
  ZM:   { ad:"Zambak",             tip:"Havlupan", byH:true,  v:[{h:500,t:"5/5",w:271,p:5058},{h:600,t:"5/6",w:361,p:6104},{h:700,t:"5/7",w:406,p:6871},{h:800,t:"5/8",w:422,p:7207},{h:900,t:"5/9",w:496,p:8292},{h:1000,t:"5/10",w:541,p:9387},{h:1100,t:"5/11",w:631,p:10077},{h:1200,t:"5/12",w:657,p:10422},{h:1500,t:"5/15",w:857,p:13292},{h:1800,t:"5/18",w:992,p:15432}]},
  YS:   { ad:"Yasemin",            tip:"Havlupan", byH:true,  v:[{h:485,t:"5/5",w:203,p:6346},{h:625,t:"5/6",w:237,p:7437},{h:695,t:"5/7",w:271,p:8268},{h:765,t:"5/8",w:304,p:9082},{h:905,t:"5/9",w:372,p:10744},{h:1045,t:"5/10",w:406,p:11850},{h:1115,t:"5/11",w:440,p:12641},{h:1255,t:"5/12",w:457,p:14286},{h:1465,t:"5/15",w:575,p:16200},{h:1745,t:"5/17",w:643,p:18340}]},
  YSL:  { ad:"Yasemin Line",       tip:"Havlupan", byH:true,  v:[{h:485,t:"5/5",w:203,p:6378},{h:625,t:"5/6",w:237,p:7473},{h:695,t:"5/7",w:271,p:8309},{h:765,t:"5/8",w:304,p:9128},{h:905,t:"5/9",w:372,p:10783},{h:1045,t:"5/10",w:406,p:11792},{h:1115,t:"5/11",w:440,p:12705},{h:1255,t:"5/12",w:457,p:14377},{h:1465,t:"5/15",w:575,p:16283},{h:1745,t:"5/17",w:643,p:18448}]},
  HLH3: { ad:"Hane Line Hvlp – 3 Dilim", tip:"Havlupan", byH:true, v:[{h:1000,t:"3",w:345,p:7110},{h:1250,t:"3",w:422,p:8066},{h:1500,t:"3",w:495,p:11429}]},
  HLH4: { ad:"Hane Line Hvlp – 4 Dilim", tip:"Havlupan", byH:true, v:[{h:1000,t:"4",w:460,p:8707},{h:1250,t:"4",w:562,p:9903},{h:1500,t:"4",w:660,p:13536}]},
  HLH5: { ad:"Hane Line Hvlp – 5 Dilim", tip:"Havlupan", byH:true, v:[{h:1000,t:"5",w:575,p:10245},{h:1250,t:"5",w:703,p:11740},{h:1500,t:"5",w:825,p:15643}]},
  TWP:  { ad:"Tower Elips Hvlp",   tip:"Havlupan", byH:true,  v:[{h:500,t:"2",w:175,p:5230},{h:600,t:"2",w:211,p:5607},{h:700,t:"2",w:246,p:5992},{h:800,t:"2",w:281,p:6379},{h:900,t:"2",w:316,p:6731},{h:1000,t:"2",w:351,p:7134},{h:1100,t:"2",w:386,p:7538},{h:1200,t:"2",w:421,p:7926},{h:1500,t:"2",w:526,p:11042},{h:1800,t:"2",w:632,p:12104}]},
  FDE:  { ad:"Defne (Flower)",     tip:"Havlupan", byH:true,  v:[{h:1000,t:"400/1000",w:426,p:12565},{h:1200,t:"400/1200",w:510,p:13735}]},
  FLA:  { ad:"Lale (Flower)",      tip:"Havlupan", byH:true,  v:[{h:1000,t:"500/1000",w:413,p:22770},{h:1200,t:"500/1200",w:495,p:25161}]},
  FLV:  { ad:"Lavanta (Flower)",   tip:"Havlupan", byH:true,  v:[{h:1000,t:"500/1000",w:461,p:19867},{h:1200,t:"500/1200",w:554,p:22284}]},
  PRE510:{ ad:"Reyhan 510 Satine", tip:"Havlupan", byH:true,  v:[{h:800,t:"RE-510/800",w:367,p:36656},{h:1000,t:"RE-510/1000",w:477,p:46662}]},
  PRE550:{ ad:"Reyhan 550 Satine", tip:"Havlupan", byH:true,  v:[{h:800,t:"RE-550/800",w:396,p:37543},{h:1000,t:"RE-550/1000",w:515,p:47812}]},
  PKA:  { ad:"Kardelen Satine",    tip:"Havlupan", byH:true,  v:[{h:1000,t:"KA-280/1000",w:360,p:31048},{h:1200,t:"KA-280/1200",w:432,p:33660},{h:1500,t:"KA-280/1500",w:540,p:37582}]},
  PANS: { ad:"Anemon Satine",      tip:"Havlupan", byH:true,  v:[{h:1000,t:"PAN-500/1000",w:258,p:25960},{h:1400,t:"PAN-500/1400",w:379,p:31951}]},
  PANA: { ad:"Anemon Ayna Polisaj",tip:"Havlupan", byH:true,  v:[{h:1000,t:"PAN-500/1000",w:258,p:35945},{h:1400,t:"PAN-500/1400",w:379,p:45930}]},
  PLOS: { ad:"Lotus Satine",       tip:"Havlupan", byH:true,  v:[{h:750,t:"PLO-500/750",w:237,p:21854},{h:1200,t:"PLO-500/1200",w:373,p:31692},{h:1500,t:"PLO-500/1500",w:464,p:36252}]},
  PLOA: { ad:"Lotus Ayna Polisaj", tip:"Havlupan", byH:true,  v:[{h:750,t:"PLO-500/750",w:237,p:26225},{h:1200,t:"PLO-500/1200",w:373,p:38031},{h:1500,t:"PLO-500/1500",w:464,p:43501}]},
};

// ─── VANA & MONTAJ ELEMANLARI (NET SATIŞ FİYATI – iskonto uygulanmaz) ────────
// netFiyat: true → sisteme direkt alış fiyatı girilir, kar böleni üstünden satış yapılır
const VANA_DATA = {
  // ── VANALAR (Beyaz PPR/PEX) ──
  V15000: { ad:"Köşe Radyatör Vanası Beyaz PPR",           tip:"Vana", netFiyat:true, p:394  },
  V15000E:{ ad:"Köşe Radyatör Vanası Eko Beyaz PPR",       tip:"Vana", netFiyat:true, p:339  },
  V15001: { ad:"Köşe Radyatör Vanası Beyaz PEX 16x2",      tip:"Vana", netFiyat:true, p:467  },
  V15001E:{ ad:"Köşe Radyatör Vanası Eko Beyaz PEX 16x2",  tip:"Vana", netFiyat:true, p:426  },
  V15003: { ad:"Köşe Radyatör Dönüş Vanası PEX 16x2",      tip:"Vana", netFiyat:true, p:427  },
  V15004: { ad:"Düz Radyatör Vanası Beyaz PPR",             tip:"Vana", netFiyat:true, p:393  },
  V15006: { ad:"Düz Radyatör Dönüş Vanası PPR",             tip:"Vana", netFiyat:true, p:382  },
  V15007: { ad:"Düz Radyatör Dönüş Vanası PEX 16x2",       tip:"Vana", netFiyat:true, p:447  },
  V15008: { ad:"H Ventil Dikey 3/8 16x2 PEX",              tip:"Vana", netFiyat:true, p:1090 },
  V15009: { ad:"1/2 PEX 16x2 Mini Küresel Tornavida",       tip:"Vana", netFiyat:true, p:298  },
  V15010: { ad:"3/8- PEX 16x2 Direkt Giriş",               tip:"Vana", netFiyat:true, p:237  },
  V15011: { ad:"1/2 İç Dişli Rakor-PEX 16x2",              tip:"Vana", netFiyat:true, p:198  },
  V15012: { ad:"1/2 Dış Dişli Rakor-PEX 16x2",             tip:"Vana", netFiyat:true, p:213  },
  V15013: { ad:"Köşe Radyatör Geri Dönüş Vanası PPR",       tip:"Vana", netFiyat:true, p:356  },
  V15014: { ad:"Köşe Radyatör Geri Dönüş Vanası Eko PEX",  tip:"Vana", netFiyat:true, p:410  },
  V15015: { ad:"Düz Radyatör Vanası PEX 16x2",              tip:"Vana", netFiyat:true, p:495  },
  // ── VANALAR (Krom) ──
  V15100: { ad:"Köşe Radyatör Vanası Krom PPR",             tip:"Vana", netFiyat:true, p:938  },
  V15100E:{ ad:"Köşe Radyatör Vanası Eko Krom PPR",         tip:"Vana", netFiyat:true, p:688  },
  V15101: { ad:"Köşe Radyatör Vanası Krom PEX 16x2",        tip:"Vana", netFiyat:true, p:1108 },
  V15101E:{ ad:"Köşe Radyatör Vanası Eko Krom PEX 16x2",    tip:"Vana", netFiyat:true, p:789  },
  V15102: { ad:"Köşe Radyatör Dönüş Vanası Krom PPR",       tip:"Vana", netFiyat:true, p:889  },
  V15103E:{ ad:"Köşe Radyatör Dönüş Eko Krom PEX 16x2",    tip:"Vana", netFiyat:true, p:748  },
  V15104: { ad:"Düz Radyatör Vanası Krom PPR",               tip:"Vana", netFiyat:true, p:962  },
  V15106: { ad:"Kare Köşe Radyatör Vanası Krom PPR",         tip:"Vana", netFiyat:true, p:1394 },
  V15107: { ad:"Kare Köşe Radyatör Vanası Krom PEX 16x2",   tip:"Vana", netFiyat:true, p:1439 },
  V15108: { ad:"Kare Köşe Radyatör Vanası Saten PPR",        tip:"Vana", netFiyat:true, p:1394 },
  V15109: { ad:"Kare Köşe Radyatör Vanası Saten PEX 16x2",  tip:"Vana", netFiyat:true, p:1471 },
  V15110: { ad:"Düz Radyatör Dönüş Vanası Krom PPR",         tip:"Vana", netFiyat:true, p:962  },
  V15111: { ad:"Köşe Radyatör Geri Dönüş Vanası Krom PEX",  tip:"Vana", netFiyat:true, p:988  },
  V15112: { ad:"Düz Radyatör Vanası Krom PEX 16x2",          tip:"Vana", netFiyat:true, p:1120 },
  V15113: { ad:"Düz Radyatör Dönüş Vanası Krom PEX 16x2",   tip:"Vana", netFiyat:true, p:1014 },
  V15114: { ad:"Köşe Radyatör Dönüş Vanası Eko Krom PPR",   tip:"Vana", netFiyat:true, p:678  },
  V15115: { ad:"Metal Volanlı Silindir Köşe Krom PPR",        tip:"Vana", netFiyat:true, p:1100 },
  V15116: { ad:"Metal Volanlı Silindir Köşe Krom PEX",        tip:"Vana", netFiyat:true, p:1187 },
  V15117: { ad:"Metal Volanlı Altın Köşe PPR",                tip:"Vana", netFiyat:true, p:1621 },
  V15118: { ad:"Metal Volanlı Altın Köşe PEX 16x2",           tip:"Vana", netFiyat:true, p:1739 },
  V15119: { ad:"Metal Volanlı Köşe Siyah PPR",                tip:"Vana", netFiyat:true, p:1079 },
  V15120: { ad:"Metal Volanlı Köşe Siyah PEX 16x2",           tip:"Vana", netFiyat:true, p:1229 },
  // ── SİLİNDİRİK VANALAR ──
  V16000: { ad:"Silindir Köşe Beyaz PPR",                    tip:"Vana", netFiyat:true, p:605  },
  V16001: { ad:"Silindir Köşe Beyaz PEX 16x2",               tip:"Vana", netFiyat:true, p:678  },
  V16002: { ad:"Silindir Köşe Krom PPR",                     tip:"Vana", netFiyat:true, p:751  },
  V16003: { ad:"Silindir Köşe Krom PEX 16x2",                tip:"Vana", netFiyat:true, p:819  },
  V16004: { ad:"Silindir Köşe Sarı PPR",                     tip:"Vana", netFiyat:true, p:1155 },
  V16005: { ad:"Silindir Köşe Sarı PEX 16x2",                tip:"Vana", netFiyat:true, p:1307 },
  V16008: { ad:"Silindir Köşe Siyah PPR",                    tip:"Vana", netFiyat:true, p:605  },
  V16009: { ad:"Silindir Köşe Siyah PEX 16x2",               tip:"Vana", netFiyat:true, p:678  },
  V16010: { ad:"Silindir Köşe Antrasit PPR",                  tip:"Vana", netFiyat:true, p:605  },
  V16011: { ad:"Silindir Köşe Antrasit PEX 16x2",             tip:"Vana", netFiyat:true, p:678  },
  V16012: { ad:"Silindir Köşe Bakır Eskitme PPR",             tip:"Vana", netFiyat:true, p:1077 },
  V16013: { ad:"Silindir Köşe Bakır Eskitme PEX 16x2",        tip:"Vana", netFiyat:true, p:1233 },
  V16014: { ad:"Silindir Köşe Mat Nikel PPR",                 tip:"Vana", netFiyat:true, p:770  },
  V16015: { ad:"Silindir Köşe Mat Nikel PEX 16x2",            tip:"Vana", netFiyat:true, p:882  },
  V16018: { ad:"Silindir Köşe Krom Kısa PPR",                 tip:"Vana", netFiyat:true, p:600  },
  V16019: { ad:"Silindir Köşe Krom Kısa PEX 16x2",            tip:"Vana", netFiyat:true, p:692  },
  V16020: { ad:"Silindir Köşe Sarı Kısa PPR",                 tip:"Vana", netFiyat:true, p:1077 },
  V16021: { ad:"Silindir Köşe Sarı Kısa PEX 16x2",            tip:"Vana", netFiyat:true, p:1233 },
  V16030: { ad:"İç Köşe Radyatör Vanası Krom PEX 16x2",       tip:"Vana", netFiyat:true, p:1141 },
  // ── ECA VANALAR ──
  V17000: { ad:"ECA Köşe Radyatör Vanası Beyaz PPR",          tip:"Vana", netFiyat:true, p:254  },
  V17001: { ad:"ECA Köşe Radyatör Vanası Beyaz PEX 16x2",     tip:"Vana", netFiyat:true, p:276  },
  V17002: { ad:"ECA Köşe Radyatör Dönüş Vanası PPR",          tip:"Vana", netFiyat:true, p:307  },
  V17003: { ad:"ECA Köşe Radyatör Dönüş Vanası PEX 16x2",     tip:"Vana", netFiyat:true, p:373  },
  V17007: { ad:"ECA Köşe Radyatör Vanası Krom PEX 16x2",      tip:"Vana", netFiyat:true, p:436  },
  V17014: { ad:"ECA Köşe Radyatör Vanası Krom PPR",            tip:"Vana", netFiyat:true, p:383  },
  V17008: { ad:"ECA H-Ventil Dikey 3/8 16x2 PEX",             tip:"Vana", netFiyat:true, p:782  },
  V17009: { ad:"ECA H-Ventil Köşe 3/8 16x2 PEX",              tip:"Vana", netFiyat:true, p:837  },
  V17010: { ad:"ECA Kısa Krom Çekirdek",                      tip:"Vana", netFiyat:true, p:251  },
  V17011: { ad:"ECA Uzun Krom Çekirdek",                      tip:"Vana", netFiyat:true, p:317  },
  V17111: { ad:"ECA Termostatik Radyatör Valfi 1/2 Köşe PPRC",tip:"Vana", netFiyat:true, p:367  },
  V17104: { ad:"ECA TRV4 Termostat Beyaz (15°C Ayarlı)",      tip:"Vana", netFiyat:true, p:418  },
  V17115: { ad:"ECA TRV4 Termostat Siyah (15°C Ayarsız)",     tip:"Vana", netFiyat:true, p:468  },
  V17105: { ad:"ECA TRV4 Termostat + Köşe Gövde PPRC",        tip:"Vana", netFiyat:true, p:733  },
  V17110: { ad:"ECA TRV4 Termostat + Köşe Gövde + PEX 16x2", tip:"Vana", netFiyat:true, p:775  },
  V17120: { ad:"ECA TRV4 Termostat Siyah + Köşe Gövde PPRC", tip:"Vana", netFiyat:true, p:773  },
  V17121: { ad:"ECA TRV4 Siyah + Köşe Gövde + PEX 16x2",     tip:"Vana", netFiyat:true, p:815  },
  V17122: { ad:"ECA TRV4 Termostat Krom (15°C Ayarsız)",      tip:"Vana", netFiyat:true, p:580  },
  V17125: { ad:"ECA H-Ventil Dikey 1/2 16x2 PEX",             tip:"Vana", netFiyat:true, p:784  },
  // ── DANFOSS ──
  V18000: { ad:"Danfoss Termostat Beyaz (15°C Ayarlı)",        tip:"Vana", netFiyat:true, p:242  },
  V18001: { ad:"Danfoss Termostat Beyaz (15°C Ayarsız)",       tip:"Vana", netFiyat:true, p:242  },
  V18002: { ad:"Danfoss Termostat Silindir Krom",               tip:"Vana", netFiyat:true, p:1275 },
  V18003: { ad:"Danfoss Termostat Silindir Beyaz",              tip:"Vana", netFiyat:true, p:930  },
  V18022: { ad:"Danfoss Termostat Silindir Siyah",              tip:"Vana", netFiyat:true, p:1045 },
  V18005: { ad:"Danfoss Termostatik Köşe Gövde PPR",            tip:"Vana", netFiyat:true, p:282  },
  V18006: { ad:"Danfoss Termostatik Düz Gövde PPR",             tip:"Vana", netFiyat:true, p:282  },
  V18007: { ad:"1/2-16x2 PEX Rakor Danfoss Uyumlu Nikel",      tip:"Vana", netFiyat:true, p:98   },
  V18008: { ad:"Danfoss Uzun Çekirdek",                         tip:"Vana", netFiyat:true, p:837  },
  V18009: { ad:"Danfoss Kısa Çekirdek",                         tip:"Vana", netFiyat:true, p:837  },
  V18010: { ad:"Danfoss Multiblok Kompakt Termostatik Gövde",   tip:"Vana", netFiyat:true, p:1737 },
  V18011: { ad:"Danfoss Termostat + Köşe Gövde PEX 16x2",      tip:"Vana", netFiyat:true, p:622  },
  V18012: { ad:"Danfoss Silindir Krom + Köşe Gövde PPR",        tip:"Vana", netFiyat:true, p:1556 },
  V18013: { ad:"Danfoss Silindir Krom + Köşe Gövde PEX 16x2",  tip:"Vana", netFiyat:true, p:1655 },
  V18014: { ad:"Danfoss Termostat + Köşe Gövde PPRC",           tip:"Vana", netFiyat:true, p:524  },
  V18020: { ad:"Danfoss Termostat Oval Beyaz (15°C Ayarlı)",    tip:"Vana", netFiyat:true, p:242  },
  V18021: { ad:"Danfoss Termostat Oval Beyaz (15°C Ayarsız)",   tip:"Vana", netFiyat:true, p:242  },
  V18023: { ad:"Danfoss Termostatik Köşe Gövde PPR Krom",       tip:"Vana", netFiyat:true, p:860  },
  V18024: { ad:"Danfoss Termostatik Düz Gövde PPR Krom",        tip:"Vana", netFiyat:true, p:879  },
  V18025: { ad:"1/2-16x2 PEX Rakor Danfoss Uyumlu Krom",       tip:"Vana", netFiyat:true, p:153  },
  // ── KOMPAKT GİRİŞ BAĞLANTI SETLERİ ──
  V70000: { ad:"Kompakt Giriş 3/8-1/2 PPR",                    tip:"Vana", netFiyat:true, p:200  },
  V70001: { ad:"Kompakt Giriş 3/8-16x2 PEX",                   tip:"Vana", netFiyat:true, p:350  },
  V70002: { ad:"Kompakt Mini Küresel Giriş 3/8-16x2 PEX",      tip:"Vana", netFiyat:true, p:620  },
  V70003: { ad:"Kompakt H Ventil 3/8-16x2 PEX",                tip:"Vana", netFiyat:true, p:785  },
  V70004: { ad:"Kompakt Köşe H Ventil 3/8-16x2 PEX",           tip:"Vana", netFiyat:true, p:840  },
  V19001: { ad:"Kompakt Giriş 3/8-3/4 H Ventil Rakor",         tip:"Vana", netFiyat:true, p:290  },
  // ECA SET
  V70010: { ad:"Kompakt 3/8-16x2 PEX + ECA Termostat + Çekirdek (SET)",             tip:"Vana", netFiyat:true, p:975  },
  V70011: { ad:"Kompakt 3/8-16x2 PEX + ECA Termostat (15°C Ayarlı) + Çekirdek (SET)", tip:"Vana", netFiyat:true, p:975  },
  V70012: { ad:"Kompakt Mini Küresel 3/8-16x2 PEX + ECA Termostat + Çekirdek (SET)", tip:"Vana", netFiyat:true, p:1243 },
  V70013: { ad:"Kompakt Mini Küresel + ECA Termostat (15°C Ayarlı) + Çekirdek (SET)", tip:"Vana", netFiyat:true, p:1243 },
  V70014: { ad:"Kompakt H Ventil + ECA Termostat + Çekirdek (SET)",                  tip:"Vana", netFiyat:true, p:1410 },
  V70015: { ad:"Kompakt H Ventil + ECA Termostat (15°C Ayarlı) + Çekirdek (SET)",   tip:"Vana", netFiyat:true, p:1410 },
  V70019: { ad:"Kompakt 3/8-1/2 PPR + ECA Termostat + Çekirdek (SET)",              tip:"Vana", netFiyat:true, p:822  },
  V70030: { ad:"Kompakt 3/8-16x2 PEX + ECA Termostat Siyah + Çekirdek (SET)",      tip:"Vana", netFiyat:true, p:1184 },
  V70031: { ad:"Kompakt Mini Küresel + ECA Termostat Siyah + Çekirdek (SET)",       tip:"Vana", netFiyat:true, p:1313 },
  V70032: { ad:"Kompakt H Ventil + ECA Termostat Siyah + Çekirdek (SET)",           tip:"Vana", netFiyat:true, p:1480 },
  V70033: { ad:"Kompakt 3/8-1/2 PPR + ECA Termostat Siyah + Çekirdek (SET)",       tip:"Vana", netFiyat:true, p:892  },
  V70040: { ad:"Kompakt 3/8-16x2 PEX + ECA TRV4 Krom + Çekirdek (SET)",           tip:"Vana", netFiyat:true, p:1185 },
  V70041: { ad:"Kompakt Mini Küresel + ECA TRV4 Krom + Çekirdek (SET)",            tip:"Vana", netFiyat:true, p:1455 },
  V70042: { ad:"Kompakt H Ventil + ECA TRV4 Krom + Çekirdek (SET)",               tip:"Vana", netFiyat:true, p:1620 },
  V70043: { ad:"Kompakt 3/8-1/2 PPR + ECA TRV4 Krom + Çekirdek (SET)",           tip:"Vana", netFiyat:true, p:1035 },
  // DANFOSS SET
  V70100: { ad:"Kompakt 3/8-16x2 PEX + Danfoss Termostat + Çekirdek (SET)",        tip:"Vana", netFiyat:true, p:1025 },
  V70101: { ad:"Kompakt 3/8-16x2 PEX + Danfoss (15°C Ayarlı) + Çekirdek (SET)",   tip:"Vana", netFiyat:true, p:1025 },
  V70102: { ad:"Kompakt Mini Küresel + Danfoss Termostat + Çekirdek (SET)",         tip:"Vana", netFiyat:true, p:1462 },
  V70104: { ad:"Kompakt H Ventil + Danfoss Termostat + Çekirdek (SET)",             tip:"Vana", netFiyat:true, p:1460 },
  V70106: { ad:"Kompakt 3/8-16x2 PEX + Danfoss Termostat Krom + Çekirdek (SET)",  tip:"Vana", netFiyat:true, p:2062 },
  V70107: { ad:"Kompakt Mini Küresel + Danfoss Krom + Çekirdek (SET)",             tip:"Vana", netFiyat:true, p:2499 },
  V70108: { ad:"Kompakt H Ventil + Danfoss Krom + Çekirdek (SET)",                 tip:"Vana", netFiyat:true, p:2499 },
  V70109: { ad:"Kompakt 3/8-1/2 PPR + Danfoss Termostat + Çekirdek (SET)",         tip:"Vana", netFiyat:true, p:871  },
  V70110: { ad:"Kompakt 3/8-1/2 PPR + Danfoss (15°C Ayarlı) + Çekirdek (SET)",    tip:"Vana", netFiyat:true, p:871  },
  V70111: { ad:"Kompakt 3/8-1/2 PPR + Danfoss Krom + Çekirdek (SET)",              tip:"Vana", netFiyat:true, p:1908 },
  // ── ZEMİN MONTAJ SETİ ──
  V27010: { ad:"Zemin Montaj Ayağı Metal Beyaz",               tip:"Vana", netFiyat:true, p:205  },
  V27011: { ad:"Zemin Montaj Ayağı Metal Renkli",              tip:"Vana", netFiyat:true, p:205  },
  V27020: { ad:"Zemin Montaj Ayağı ABS Tekli Beyaz",           tip:"Vana", netFiyat:true, p:200  },
  V27021: { ad:"Zemin Montaj Ayağı ABS Tekli Krom",            tip:"Vana", netFiyat:true, p:300  },
  V27030: { ad:"Zemin Montaj Ayağı ABS Kompak Beyaz",          tip:"Vana", netFiyat:true, p:240  },
  V27031: { ad:"Zemin Montaj Ayağı ABS Kompak Krom",           tip:"Vana", netFiyat:true, p:420  },
  // ── BORU GİZLEME KILIFLARI & ROZETLER ──
  V50000: { ad:"Tekli Geçmeli Boru Kılıfı Beyaz",             tip:"Vana", netFiyat:true, p:25   },
  V50010: { ad:"Tekli Geçmeli Boru Kılıfı Krom",              tip:"Vana", netFiyat:true, p:106  },
  V50020: { ad:"Tekli Geçmeli Boru Kılıfı Gümüş",             tip:"Vana", netFiyat:true, p:106  },
  V50030: { ad:"Tekli Geçmeli Boru Kılıfı Siyah",             tip:"Vana", netFiyat:true, p:26   },
  V51000: { ad:"Tekli Yaylı Boru Kılıfı Beyaz",               tip:"Vana", netFiyat:true, p:66   },
  V51010: { ad:"Tekli Yaylı Boru Kılıfı Krom",                tip:"Vana", netFiyat:true, p:116  },
  V52000: { ad:"Çiftli Geçmeli Boru Kılıfı Beyaz",            tip:"Vana", netFiyat:true, p:53   },
  V52010: { ad:"Çiftli Geçmeli Boru Kılıfı Krom",             tip:"Vana", netFiyat:true, p:280  },
  V53000: { ad:"Çiftli Yaylı Boru Kılıfı Beyaz",              tip:"Vana", netFiyat:true, p:110  },
  V53010: { ad:"Çiftli Yaylı Boru Kılıfı Krom",               tip:"Vana", netFiyat:true, p:190  },
  V54000: { ad:"Havlupan Boru Kılıfı Beyaz",                  tip:"Vana", netFiyat:true, p:22   },
  V54010: { ad:"Havlupan Boru Kılıfı Krom",                   tip:"Vana", netFiyat:true, p:40   },
  V54050: { ad:"Havlupan Boru Kılıfı Altın",                  tip:"Vana", netFiyat:true, p:30   },
  V55000: { ad:"Rozet Beyaz",                                  tip:"Vana", netFiyat:true, p:45   },
  V55010: { ad:"Rozet Krom",                                   tip:"Vana", netFiyat:true, p:42   },
  V60000: { ad:"Tekli Hareketli Boru Kılıfı Beyaz",           tip:"Vana", netFiyat:true, p:27   },
  V60010: { ad:"Tekli Hareketli Boru Kılıfı Krom",            tip:"Vana", netFiyat:true, p:119  },
  V61000: { ad:"Çiftli Hareketli Boru Kılıfı Beyaz",          tip:"Vana", netFiyat:true, p:37   },
  V61010: { ad:"Çiftli Hareketli Boru Kılıfı Krom",           tip:"Vana", netFiyat:true, p:171  },
  V62000: { ad:"Çiftli Hareketli Uzun Boru Kılıfı Beyaz",     tip:"Vana", netFiyat:true, p:33   },
  V62010: { ad:"Çiftli Hareketli Uzun Boru Kılıfı Krom",      tip:"Vana", netFiyat:true, p:131  },
  V63000: { ad:"Havlupan Hareketli Boru Kılıfı PEX Beyaz",   tip:"Vana", netFiyat:true, p:21   },
  V63010: { ad:"Havlupan Hareketli Boru Kılıfı PEX Krom",    tip:"Vana", netFiyat:true, p:86   },
  V64000: { ad:"Havlupan Hareketli Boru Kılıfı PPR Beyaz",   tip:"Vana", netFiyat:true, p:58   },
  V64010: { ad:"Havlupan Hareketli Boru Kılıfı PPR Krom",    tip:"Vana", netFiyat:true, p:126  },
  // ── İNHİBÜTÖR ──
  V80000: { ad:"R-24 İnhibütör 25 kg Bidon",                  tip:"Vana", netFiyat:true, p:15678 },
  V80001: { ad:"R-24 İnhibütör 1000 gr Plastik Şişe",         tip:"Vana", netFiyat:true, p:622   },
  V80002: { ad:"R-24 İnhibütör 500 gr Plastik Şişe",          tip:"Vana", netFiyat:true, p:324   },
  V80003: { ad:"R-24 İnhibütör 250 gr Plastik Şişe",          tip:"Vana", netFiyat:true, p:174   },
};

const ALL_MODELS = { ...RADYATOR_DATA, ...HAVLUPAN_DATA, ...VANA_DATA };

const RENKLER = [
  { kod:"RAL 9010", ad:"Kırık Beyaz",         fark:0,  grup:"Standart" },
  { kod:"RAL 9016", ad:"Parlak Beyaz",         fark:0,  grup:"Standart" },
  { kod:"RAL 9016 Kumlu", ad:"Beyaz Kumlu",    fark:0,  grup:"Standart" },
  { kod:"RAL 9006", ad:"Alüminyum",            fark:0,  grup:"Standart" },
  { kod:"RAL 7040", ad:"Gri Kumlu",            fark:0,  grup:"Standart" },
  { kod:"RAL 9005", ad:"Siyah",                fark:0,  grup:"Standart" },
  { kod:"RAL 7016", ad:"Antrasit",             fark:0,  grup:"Standart" },
  { kod:"TX 002",   ad:"Antrasit Kumlu",        fark:0,  grup:"Standart" },
  { kod:"RAL 9005K",ad:"Siyah Kumlu",          fark:0,  grup:"Standart" },
  { kod:"RAL 9016M",ad:"Süper Mat Beyaz",      fark:0,  grup:"Standart" },
  { kod:"An 01",    ad:"Parlak Eloksal",        fark:0,  grup:"Eloksal"  },
  { kod:"An 02",    ad:"Mat Eloksal",           fark:0,  grup:"Eloksal"  },
  { kod:"PE10",     ad:"Süper Mat Bej",         fark:10, grup:"Özel RAL" },
  { kod:"RAL 9005M",ad:"Süper Mat Siyah",      fark:10, grup:"Özel RAL" },
  { kod:"RAL 9018", ad:"Papirüs Beyazı",       fark:10, grup:"Özel RAL" },
  { kod:"RAL 7032", ad:"Çakıl Grisi Kumlu",    fark:10, grup:"Özel RAL" },
  { kod:"An 03",    ad:"Satine Eloksal",        fark:10, grup:"Eloksal"  },
  { kod:"BONN 007", ad:"Açık Bronz",            fark:10, grup:"Bonded"   },
  { kod:"Mr 7773",  ad:"Parlak Gümüş",          fark:25, grup:"Özel RAL" },
  { kod:"Bd 1923",  ad:"Bonded Altın",          fark:25, grup:"Bonded"   },
  { kod:"Bd 7890",  ad:"Bonded İnoks",          fark:25, grup:"Bonded"   },
  { kod:"Bd 7900",  ad:"Bonded Gümüş",          fark:25, grup:"Bonded"   },
  { kod:"Cr 9005",  ad:"Deri Siyah",            fark:25, grup:"Deri/Film"},
  { kod:"An 04",    ad:"Parlak Altın Eloksal",  fark:25, grup:"Eloksal"  },
  { kod:"An 05",    ad:"Açık Bronz Eloksal",    fark:25, grup:"Eloksal"  },
  { kod:"Wd 01",    ad:"Açık Meşe (Ahşap)",     fark:35, grup:"Ahşap"    },
  { kod:"Wd 02",    ad:"Rustik Meşe (Ahşap)",   fark:35, grup:"Ahşap"    },
  { kod:"RF 01",    ad:"Resimli Film Baskı",    fark:35, grup:"Deri/Film"},
  { kod:"PS 01",    ad:"Ayna Yüzlü Paslanmaz (Havlupan)", fark:40, grup:"Paslanmaz" },
];


const fmt = (n) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ─── COMPONENT ──────────────────────────────────────────────────────────────
export default function RadyalTeklif() {
  const [modelKey, setModelKey] = useState("KN");
  const [height, setHeight] = useState("");
  const [uzunluk, setUzunluk] = useState(""); // mm
  const [adet, setAdet] = useState(1);
  const [mahal, setMahal] = useState("");
  const [renk, setRenk] = useState(RENKLER[0]);

  // ── Responsive
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState("form"); // "form" | "teklif"
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  const [karBoleni, setKarBoleni] = useState(0.80);  // kar = fiyat / bölen
  const [satirlar, setSatirlar] = useState([]);
  const [musterı, setMusteri] = useState("");
  const [projeAdi, setProjeAdi] = useState("");

  const model = ALL_MODELS[modelKey];
  const isHavlupan = !!model?.byH;
  const isVana = !!model?.netFiyat;
  const seciliVaryant = isVana ? { h:0, w:0, p: model.p } : model?.v.find(v => v.h === parseInt(height));

  // Radyatör: dilim hesabı
  const dilimSayisi = !isHavlupan && !isVana && seciliVaryant && uzunluk
    ? Math.ceil(parseFloat(uzunluk) / model.dw)
    : null;
  // Yuvarlama sonrası gerçek (üretilecek) radyatör uzunluğu
  const gercekUzunluk = (!isHavlupan && !isVana && dilimSayisi && model) ? dilimSayisi * model.dw : null;

  // Toplam fiyat (birim)
  const birimFiyat = seciliVaryant ? seciliVaryant.p : null;
  const hamFiyat = !isHavlupan && !isVana
    ? (birimFiyat && dilimSayisi ? birimFiyat * dilimSayisi : null)
    : birimFiyat;
  const renkFark = renk ? renk.fark : 0;
  // Maliyet:
  //   radyatör  → liste * (1-44%) * (1+renk%)
  //   havlupan  → liste * (1-46%) * (1+renk%)
  //   vana/mont → net liste fiyatı (iskonto yok, renk farkı da yok)
  const LISTE_ISKONTO_RAD = 0.44;
  const LISTE_ISKONTO_HVL = 0.46;
  const maliyetBirim = birimFiyat
    ? isVana
      ? birimFiyat  // net fiyat, direkt maliyet
      : isHavlupan
        ? birimFiyat * (1 - LISTE_ISKONTO_HVL) * (1 + renkFark/100)
        : birimFiyat * (1 - LISTE_ISKONTO_RAD) * (1 + renkFark/100)
    : null;
  const birimFiyatRenkli = maliyetBirim; // maliyet = alış fiyatı
  const satışBirim = maliyetBirim ? maliyetBirim / karBoleni : null;
  const toplamFiyat = satışBirim && (hamFiyat !== null) ? satışBirim * (!isHavlupan && !isVana ? (dilimSayisi||0) : 1) * adet : null;
  const maliyetToplam = maliyetBirim ? maliyetBirim * (!isHavlupan && !isVana ? (dilimSayisi||0) : 1) * adet : null;
  const karTL = (toplamFiyat && maliyetToplam) ? toplamFiyat - maliyetToplam : null;
  const karYuzde = karBoleni > 0 ? Math.round((1 - karBoleni) * 100) : 0;

  const ekle = () => {
    if (isVana) {
      if (toplamFiyat === null) return;
      const satir = {
        id: Date.now(),
        mahal,
        kod: modelKey,
        ad: model.ad,
        yukseklik: "-",
        uzunluk: "-",
        dilim: "-",
        watt: "-",
        tip: model.tip,
        listeBirim: birimFiyat,
        maliyetBirim: birimFiyat,
        satışBirim: satışBirim,
        birim: satışBirim,
        renkKod: "-",
        renkAd: "-",
        renkFark: 0,
        karYuzde: karYuzde,
        adet,
        toplam: toplamFiyat,
        isVana: true,
      };
      setSatirlar(p => [...p, satir]);
      setMahal(""); setAdet(1);
      if (isMobile) setActiveTab("teklif");
      return;
    }
    if (!seciliVaryant || toplamFiyat === null) return;
    const satir = {
      id: Date.now(),
      mahal,
      kod: modelKey,
      ad: model.ad,
      yukseklik: seciliVaryant.h,
      uzunluk: isHavlupan ? "-" : `${gercekUzunluk} mm`,
      dilim: isHavlupan ? "-" : dilimSayisi,
      watt: seciliVaryant.w,
      tip: isHavlupan ? (seciliVaryant.t || "-") : "-",
      listeBirim: birimFiyat,
      maliyetBirim: maliyetBirim,
      satışBirim: satışBirim,
      birim: satışBirim,
      renkKod: renk.kod,
      renkAd: renk.ad,
      renkFark: renk.fark,
      karYuzde: karYuzde,
      adet,
      toplam: toplamFiyat,
      isVana: false,
    };
    setSatirlar(p => [...p, satir]);
    setMahal(""); setUzunluk(""); setAdet(1);
    if (isMobile) setActiveTab("teklif");
  };

  const sil = (id) => setSatirlar(p => p.filter(s => s.id !== id));

  const genelToplam = satirlar.reduce((a, s) => a + s.toplam, 0);
  const genelMaliyet = satirlar.reduce((a, s) => a + (s.maliyetBirim * (s.dilim !== "-" ? s.dilim : 1) * s.adet), 0);
  const genelKar = genelToplam - genelMaliyet;
  const KDV_ORANI = 0.20;
  const kdvTutari = genelToplam * KDV_ORANI;
  const genelToplamKdvli = genelToplam * (1 + KDV_ORANI);

  const yazdir = () => {
    const tarih = new Date().toLocaleDateString("tr-TR");
    const satirHTML = satirlar.map((s,i) => `<tr style="background:${i%2===0?"#fff":"#f9f9f9"}"><td>${s.mahal||"-"}</td><td><b>${s.kod}</b> – ${ALL_MODELS[s.kod]?.ad||""}</td><td>${s.renkAd}${s.renkFark>0?` <span style="color:#e8640a;font-size:9px">(+%${s.renkFark})</span>`:""}</td><td>${s.yukseklik} mm</td><td>${s.uzunluk}</td><td>${s.dilim}</td><td>${s.watt} W</td><td style="text-align:right">₺${fmt(s.birim)}</td><td style="text-align:center">${s.adet}</td><td style="text-align:right;font-weight:700">₺${fmt(s.toplam)}</td></tr>`).join("");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Radyal Teklif</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:#222;padding:24px 32px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #e8640a}.logo{font-size:22px;font-weight:800;color:#e8640a;letter-spacing:-1px}.logo-sub{font-size:10px;color:#888;margin-top:2px}.meta{text-align:right;font-size:11px;color:#555;line-height:1.8}.info-bar{display:flex;gap:32px;background:#f5f5f5;border-radius:6px;padding:10px 16px;margin-bottom:18px}.info-bar label{color:#888;font-size:10px;text-transform:uppercase;display:block}.info-bar b{font-size:13px;color:#222}table{width:100%;border-collapse:collapse;margin-bottom:16px}th{background:#1a1d27;color:#fff;padding:8px 10px;font-size:10px;text-align:left;letter-spacing:.5px;text-transform:uppercase}td{padding:7px 10px;border-bottom:1px solid #eee;vertical-align:middle}.tr-tot{background:#1a1d27;color:#fff}.tr-tot td{padding:12px 10px;font-weight:700;font-size:13px;border:none}.notes{font-size:10px;color:#888;line-height:1.9;margin-top:12px;padding-top:12px;border-top:1px solid #eee}.stamp{margin-top:40px;display:flex;justify-content:space-between}.stamp-box{border-top:1px solid #ccc;width:180px;padding-top:8px;text-align:center;font-size:10px;color:#888}@media print{body{padding:0}}</style></head><body><div class="header"><div><div class="logo">radyal</div><div class="logo-sub">RADYAL ISITMA SİSTEMLERİ A.Ş &nbsp;|&nbsp; Tel: 850-308 08 08 &nbsp;|&nbsp; info@radyal.com</div></div><div class="meta"><div><b>TARİH:</b> ${tarih}</div><div><b>FİYAT LİSTESİ:</b> 01.05.2026</div><div style="margin-top:4px;font-size:14px;font-weight:700;color:#e8640a">TEKLİF</div></div></div><div class="info-bar">${musterı?`<div><label>Müşteri</label><b>${musterı}</b></div>`:""} ${projeAdi?`<div><label>Proje</label><b>${projeAdi}</b></div>`:""}<div><label>Kalem Sayısı</label><b>${satirlar.length}</b></div><div><label>Satış Toplamı (KDV Hariç)</label><b>₺${fmt(genelToplam)}</b></div><div><label>KDV Dahil Toplam</label><b style="color:#e8640a">₺${fmt(genelToplamKdvli)}</b></div></div><table><thead><tr><th>Mahal</th><th>Model</th><th>Renk</th><th>Yükseklik</th><th>Uzunluk</th><th>Dilim</th><th>Verim</th><th style="text-align:right">Birim ₺</th><th style="text-align:center">Adet</th><th style="text-align:right">Toplam ₺</th></tr></thead><tbody>${satirHTML}</tbody><tfoot><tr class="tr-tot"><td colspan="9">ARA TOPLAM (KDV HARİÇ)</td><td style="text-align:right">₺${fmt(genelToplam)}</td></tr><tr style="background:#f5f5f5"><td colspan="9" style="text-align:right;font-weight:600">KDV (%20)</td><td style="text-align:right;font-weight:600">₺${fmt(kdvTutari)}</td></tr><tr class="tr-tot"><td colspan="9">GENEL TOPLAM (KDV DAHİL)</td><td style="text-align:right">₺${fmt(genelToplamKdvli)}</td></tr></tfoot></table><div class="notes"><b>Genel Satış Şartları:</b> Fiyatlar fabrika teslim, KDV hariçtir. Isıl güç ∆T60 (90/70–20°C). Standart renkler: RAL 9010/9016 Beyaz, RAL 9005 Siyah. Özel renk %10–40 fark. Ödeme gecikmesinde %3 vade farkı. Fiyat değişikliği hakkı saklıdır.</div><div class="stamp"><div class="stamp-box">Hazırlayan İmza / Kaşe</div><div class="stamp-box">Müşteri İmza / Kaşe</div></div><script>window.onload=()=>{window.print()}<\/script></body></html>`;
    const w = window.open("","_blank");
    w.document.write(html);
    w.document.close();
  };

  const radyatorler = Object.entries(ALL_MODELS).filter(([,v]) => !v.byH && !v.netFiyat);
  const havlupanlar = Object.entries(ALL_MODELS).filter(([,v]) => v.byH);
  const vanalar     = Object.entries(ALL_MODELS).filter(([,v]) => v.netFiyat);

  return (
    <div style={{
      fontFamily:"'DM Sans', 'Helvetica Neue', sans-serif",
      background:"#0f1117",
      minHeight:"100vh",
      color:"#e8e4dd",
      padding:"0"
    }}>
      {/* HEADER */}
      <div style={{
        background:"linear-gradient(135deg, #1a1d27 0%, #12141e 100%)",
        borderBottom:"1px solid #2a2d3e",
        padding: isMobile ? "14px 16px" : "20px 32px",
        display:"flex", alignItems: isMobile ? "flex-start" : "center",
        flexDirection: isMobile ? "column" : "row",
        gap:12
      }}>
        <div style={{display:"flex", alignItems:"center", gap:12, width:"100%"}}>
          <div style={{
            background:"linear-gradient(135deg, #e8640a, #f5a623)",
            borderRadius:8, width:36, height:36, flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:16, fontWeight:700, color:"#fff", letterSpacing:-1
          }}>R</div>
          <div>
            <div style={{fontSize: isMobile ? 15 : 18, fontWeight:700, color:"#f0ece5", letterSpacing:-0.5}}>Radyal Teklif Hazırlama</div>
            <div style={{fontSize:11, color:"#666", marginTop:1}}>01.05.2026 Fiyat Listesi • KDV Hariç • Fabrika Teslim</div>
          </div>
        </div>
        <div style={{display:"flex", gap:8, width: isMobile ? "100%" : "auto", marginLeft: isMobile ? 0 : "auto"}}>
          <input placeholder="Müşteri adı" value={musterı} onChange={e=>setMusteri(e.target.value)}
            style={{...inputSt, flex:1}} />
          <input placeholder="Proje adı" value={projeAdi} onChange={e=>setProjeAdi(e.target.value)}
            style={{...inputSt, flex:1}} />
        </div>
      </div>

      {/* MOBİL SEKMELER */}
      {isMobile && (
        <div style={{display:"flex", background:"#12141e", borderBottom:"1px solid #2a2d3e"}}>
          {["form","teklif"].map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{
              flex:1, padding:"12px 0", border:"none", cursor:"pointer",
              background: activeTab===tab ? "#1a1d27" : "transparent",
              color: activeTab===tab ? "#e8640a" : "#666",
              fontWeight: activeTab===tab ? 700 : 400,
              fontSize:13, borderBottom: activeTab===tab ? "2px solid #e8640a" : "2px solid transparent"
            }}>
              {tab==="form" ? "🛒 Ürün Ekle" : `📋 Teklif (${satirlar.length})`}
            </button>
          ))}
        </div>
      )}

      <div style={{
        padding: isMobile ? "16px" : "24px 32px",
        display: isMobile ? "block" : "grid",
        gridTemplateColumns: "380px 1fr",
        gap:24, alignItems:"start"
      }}>

        {/* SOL PANEL - GİRİŞ */}
        <div style={{
          background:"#1a1d27", borderRadius:12, border:"1px solid #2a2d3e",
          overflow:"hidden",
          display: isMobile && activeTab !== "form" ? "none" : "block"
        }}>
          <div style={{padding:"16px 20px", borderBottom:"1px solid #2a2d3e",
            background:"linear-gradient(90deg,#1e2135,#1a1d27)",
            fontSize:13,fontWeight:600,color:"#888",letterSpacing:1,textTransform:"uppercase"
          }}>Ürün Seç</div>

          <div style={{padding:20, display:"flex", flexDirection:"column", gap:16}}>

            {/* Mahal */}
            <div>
              <Label>Mahal / Lokasyon</Label>
              <input value={mahal} onChange={e=>setMahal(e.target.value)}
                placeholder="ör. Salon, Banyo, Yatak Odası"
                style={{...inputSt, width:"100%", boxSizing:"border-box"}} />
            </div>

            {/* Model Seçimi */}
            <div>
              <Label>Model Serisi</Label>
              <select value={modelKey} onChange={e=>{setModelKey(e.target.value);setHeight("");setUzunluk("")}}
                style={{...inputSt, width:"100%", boxSizing:"border-box", cursor:"pointer"}}>
                <optgroup label="── ALÜMİNYUM RADYATÖR ──">
                  {radyatorler.map(([k,v])=>(
                    <option key={k} value={k}>{k} – {v.ad} ({v.dw}mm dilim)</option>
                  ))}
                </optgroup>
                <optgroup label="── HAVLUPAN ──">
                  {havlupanlar.map(([k,v])=>(
                    <option key={k} value={k}>{k} – {v.ad}</option>
                  ))}
                </optgroup>
                <optgroup label="── VANA & AKSESUAR (Net Fiyat) ──">
                  {vanalar.map(([k,v])=>(
                    <option key={k} value={k}>{k} – {v.ad}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Model Bilgisi */}
            {model && !isHavlupan && (
              <div style={{
                background:"#12141e", borderRadius:8, padding:"10px 14px",
                border:"1px solid #2a2d3e", fontSize:12, color:"#888",
                display:"flex", gap:16
              }}>
                <span>Dilim genişliği: <b style={{color:"#e8640a"}}>{model.dw} mm</b></span>
                <span>Derinlik: <b style={{color:"#e8640a"}}>{model.depth} mm</b></span>
              </div>
            )}

            {/* Yükseklik – vana için gösterme */}
            {!isVana && (
            <div>
              <Label>Yükseklik (mm)</Label>
              <select value={height} onChange={e=>setHeight(e.target.value)}
                style={{...inputSt, width:"100%", boxSizing:"border-box", cursor:"pointer"}}>
                <option value="">-- Seçin --</option>
                {model?.v.map(vr=>(
                  <option key={vr.h} value={vr.h}>
                    {isHavlupan
                      ? `${vr.t ? `[${vr.t}] ` : ""}${vr.h} mm — ${vr.w} W`
                      : `${vr.h} mm — ${vr.w} W/dilim`}
                  </option>
                ))}
              </select>
            </div>
            )}

            {/* Vana seçilince net fiyat bilgisi göster */}
            {isVana && (
              <div style={{
                background:"#12141e", borderRadius:8, padding:"10px 14px",
                border:"1px solid #2a2d3e", fontSize:13, color:"#e8640a",fontWeight:600
              }}>
                🏷 NET SATIŞ FİYATI: ₺{fmt(model.p)}
                <div style={{fontSize:11,color:"#666",fontWeight:400,marginTop:3}}>İskonto uygulanmaz — üzerine kar böleni eklenir</div>
              </div>
            )}

            {/* Uzunluk (sadece radyatör) */}
            {!isHavlupan && !isVana && (
              <div>
                <Label>Radyatör Uzunluğu (mm)</Label>
                <div style={{position:"relative"}}>
                  <input type="number" min="1" value={uzunluk}
                    onChange={e=>setUzunluk(e.target.value)}
                    placeholder="ör. 1200"
                    style={{...inputSt, width:"100%", boxSizing:"border-box", paddingRight:40}} />
                  <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",
                    color:"#555",fontSize:12}}>mm</span>
                </div>
                {dilimSayisi !== null && (() => {
                  const oranTam = parseFloat(uzunluk) / model.dw;
                  const gercekUzunlukMm = dilimSayisi * model.dw;
                  const tamSayi = Math.abs(oranTam - dilimSayisi) < 0.001;
                  return (
                    <div style={{marginTop:6, fontSize:13, color:"#e8640a", fontWeight:600}}>
                      → {dilimSayisi} dilim ({uzunluk} mm ÷ {model.dw} mm = {oranTam.toFixed(2)}{!tamSayi ? ` → üste yuvarlandı` : ""})
                      {!tamSayi && (
                        <span style={{display:"block", marginTop:2, fontSize:11, color:"#888", fontWeight:400}}>
                          Gerçek radyatör uzunluğu: {gercekUzunlukMm} mm
                        </span>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}


            {/* Renk Seçimi - vana için gösterme */}
            {!isVana && (
            <div>
              <Label>Renk</Label>
              <select value={renk.kod} onChange={e=>setRenk(RENKLER.find(r=>r.kod===e.target.value))}
                style={{...inputSt, width:"100%", boxSizing:"border-box", cursor:"pointer"}}>
                {["Standart","Özel RAL","Eloksal","Bonded","Deri/Film","Ahşap"].map(g=>(
                  <optgroup key={g} label={`── ${g} ──`}>
                    {RENKLER.filter(r=>r.grup===g).map(r=>(
                      <option key={r.kod} value={r.kod}>
                        {r.ad} {r.fark>0?`(+%${r.fark})`:"(Standart)"}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {renk.fark > 0 && (
                <div style={{marginTop:5,fontSize:12,color:"#e8640a",fontWeight:600}}>
                  ⚠ Bu renk için +%{renk.fark} fiyat farkı uygulanır
                </div>
              )}
            </div>
            )}

            {/* Adet */}
            <div>
              <Label>Adet</Label>
              <input type="number" min="1" value={adet}
                onChange={e=>setAdet(Number(e.target.value))}
                style={{...inputSt, width:"100%", boxSizing:"border-box"}} />
            </div>


            {/* Kar Ayarı */}
            <div style={{
              background:"#12141e", borderRadius:8, padding:"12px 14px",
              border:"1px solid #2d4020"
            }}>
              <Label>Kar Ayarı (Bölücü)</Label>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:12,color:"#666"}}>Maliyet ÷</span>
                <input type="number" min="0.50" max="1.00" step="0.01"
                  value={karBoleni}
                  onChange={e=>setKarBoleni(Math.max(0.50,Math.min(1.00,Number(e.target.value))))}
                  style={{...inputSt, width:70, textAlign:"center", fontWeight:700}} />
                <div style={{
                  background:"linear-gradient(135deg,#1e3a0f,#243a12)",
                  borderRadius:6, padding:"6px 12px",
                  fontSize:13, fontWeight:700, color:"#8dd45c", whiteSpace:"nowrap"
                }}>
                  = %{Math.round((1-karBoleni)*100)} marj
                </div>
              </div>
              <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
                {[{b:0.90,l:"%11"},{b:0.80,l:"%20"},{b:0.75,l:"%25"},{b:0.70,l:"%30"},{b:0.60,l:"%40"}].map(({b,l})=>(
                  <button key={b} onClick={()=>setKarBoleni(b)} style={{
                    background: karBoleni===b ? "linear-gradient(135deg,#e8640a,#f5a623)" : "#1e2135",
                    color: karBoleni===b ? "#fff" : "#888",
                    border:"1px solid "+(karBoleni===b?"#e8640a":"#2a2d3e"),
                    borderRadius:5, padding:"4px 10px", fontSize:11, fontWeight:600, cursor:"pointer"
                  }}>{l}</button>
                ))}
              </div>
            </div>

            {/* Özet */}
            {(isVana || seciliVaryant) && toplamFiyat !== null && (
              <div style={{
                background:"linear-gradient(135deg,#1e2a0f,#1a2710)",
                borderRadius:10, padding:"14px 16px",
                border:"1px solid #2d4020",
              }}>
                <div style={{fontSize:12,color:"#5a7a3a",fontWeight:600,marginBottom:10,letterSpacing:1,textTransform:"uppercase"}}>
                  {isVana ? "💰 Net Fiyat Özeti" : "Fiyat Özeti"}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {!isHavlupan && !isVana && dilimSayisi && (
                    <Row label="Dilim sayısı" val={`${dilimSayisi} adet`} />
                  )}
                  <Row
                    label={isVana ? "NET Satış Fiyatı (liste)" : "Liste birim"}
                    val={`₺${fmt(birimFiyat)}${!isHavlupan && !isVana?" /dilim":" /adet"}`}
                    accent={isVana ? "#e8640a" : "#555"}
                  />
                  {!isVana && (
                    <Row
                      label={`-${isHavlupan?"46":"44"}% iskonto sonrası birim`}
                      val={`₺${fmt(maliyetBirim)}${renkFark>0?` (+%${renkFark} renk)`:""}`}
                      accent="#aaa"
                    />
                  )}
                  <div style={{borderTop:"1px solid #2d4020",paddingTop:6,marginTop:2}}>
                    <Row
                      label={`Maliyet (${!isHavlupan && !isVana ? dilimSayisi+" dilim × " : ""}${adet} adet)`}
                      val={`₺${maliyetBirim && (isHavlupan || isVana || dilimSayisi) ? fmt(maliyetBirim*(!isHavlupan && !isVana?dilimSayisi:1)*adet) : "-"}`}
                      accent="#e8a87c"
                    />
                    <Row
                      label={`Kar ÷${karBoleni} = %${karYuzde} marj`}
                      val={satışBirim && (isHavlupan || isVana || dilimSayisi) ? `+₺${fmt((satışBirim - maliyetBirim)*(!isHavlupan && !isVana?dilimSayisi:1)*adet)}` : "-"}
                      accent="#8dd45c"
                    />
                  </div>
                  <div style={{borderTop:"1px solid #2d4020",paddingTop:8,marginTop:4,
                    display:"flex",justifyContent:"space-between",
                    fontSize:16,fontWeight:700,color:"#8dd45c"}}>
                    <span>SATIŞ FİYATI</span>
                    <span>{toplamFiyat ? "₺"+fmt(toplamFiyat) : "-"}</span>
                  </div>
                </div>
              </div>
            )}

            <button onClick={ekle}
              disabled={isVana ? false : (!seciliVaryant || (!isHavlupan && !dilimSayisi))}
              style={{
                background: (isVana || seciliVaryant) ? "linear-gradient(135deg,#e8640a,#f5a623)" : "#2a2d3e",
                color: (isVana || seciliVaryant) ? "#fff" : "#555",
                border:"none", borderRadius:8, padding:"12px 0",
                fontSize:14, fontWeight:700, cursor: (isVana || seciliVaryant) ? "pointer" : "not-allowed",
                letterSpacing:0.5, transition:"all .2s"
              }}>
              + Teklife Ekle
            </button>
          </div>
        </div>

        {/* SAĞ PANEL - TEKLİF */}
        <div style={{
          marginTop: isMobile ? 0 : 0,
          display: isMobile && activeTab !== "teklif" ? "none" : "block"
        }}>
          {/* Başlık */}
          {(musterı || projeAdi) && (
            <div style={{marginBottom:16,padding:"12px 16px",background:"#1a1d27",
              borderRadius:8,border:"1px solid #2a2d3e",fontSize:13,color:"#888"}}>
              {musterı && <span>Müşteri: <b style={{color:"#e8e4dd"}}>{musterı}</b></span>}
              {musterı && projeAdi && <span style={{margin:"0 12px",color:"#333"}}>|</span>}
              {projeAdi && <span>Proje: <b style={{color:"#e8e4dd"}}>{projeAdi}</b></span>}
              <span style={{float:"right",fontSize:11,color:"#555"}}>
                {new Date().toLocaleDateString("tr-TR")}
              </span>
            </div>
          )}

          {satirlar.length === 0 ? (
            <div style={{
              background:"#1a1d27",borderRadius:12,border:"1px dashed #2a2d3e",
              padding:"60px 0",textAlign:"center",color:"#444",fontSize:14
            }}>
              Soldan ürün ekleyin
            </div>
          ) : (
            <>
              <div style={{
                background:"#1a1d27",borderRadius:12,border:"1px solid #2a2d3e",
                overflow:"hidden"
              }}>
                {/* Tablo Header - sadece desktop */}
                {!isMobile && (
                  <div style={{
                    display:"grid",
                    gridTemplateColumns:"100px 70px 100px 80px 50px 50px 80px 90px 36px",
                    padding:"10px 16px",
                    background:"#12141e",
                    borderBottom:"1px solid #2a2d3e",
                    fontSize:11, color:"#555", fontWeight:600, letterSpacing:0.8, textTransform:"uppercase",
                    gap:8
                  }}>
                    <span>Mahal</span>
                    <span>Model</span>
                    <span>Renk</span>
                    <span>Yükseklik</span>
                    <span>Dilim</span>
                    <span>Watt</span>
                    <span>Birim ₺</span>
                    <span>Adet</span>
                    <span style={{textAlign:"right"}}>Toplam ₺</span>
                    <span></span>
                  </div>
                )}

                {satirlar.map((s,i) => isMobile ? (
                  /* MOBİL KART */
                  <div key={s.id} style={{
                    padding:"12px 16px",
                    borderBottom: i < satirlar.length-1 ? "1px solid #1e2135" : "none",
                    background: i%2===0 ? "transparent" : "#161821",
                    position:"relative"
                  }}>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                      <div>
                        <span style={{fontWeight:700,color:"#e8640a",fontSize:15}}>{s.kod}</span>
                        <span style={{color:"#888",fontSize:12,marginLeft:8}}>{s.ad}</span>
                        {s.isVana && <span style={{marginLeft:8,fontSize:10,background:"#1e3a5f",color:"#5ba3e8",borderRadius:4,padding:"1px 6px",fontWeight:600}}>NET FİYAT</span>}
                      </div>
                      <button onClick={()=>sil(s.id)} style={{
                        background:"none",border:"none",color:"#e05a5a",
                        cursor:"pointer",fontSize:20,padding:0,lineHeight:1,marginLeft:8
                      }}>×</button>
                    </div>
                    <div style={{marginTop:6,display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 12px",fontSize:12,color:"#888"}}>
                      {s.mahal && s.mahal!=="-" && <span>📍 {s.mahal}</span>}
                      {!s.isVana && <span>↕ {s.yukseklik} mm</span>}
                      {!s.isVana && s.dilim !== "-" && <span>↔ {s.uzunluk} ({s.dilim} dilim)</span>}
                      {s.tip && s.tip !== "-" && !s.isVana && <span>Tip: {s.tip}</span>}
                      {!s.isVana && <span>⚡ {s.watt} W</span>}
                      {!s.isVana && <span style={{color:s.renkFark>0?"#e8640a":"#888"}}>{s.renkAd}{s.renkFark>0?` (+%${s.renkFark})`:""}</span>}
                      <span>× {s.adet} adet</span>
                    </div>
                    <div style={{marginTop:8,display:"flex",justifyContent:"flex-end",alignItems:"baseline",gap:8}}>
                      <span style={{fontSize:11,color:"#555"}}>birim ₺{fmt(s.birim)}</span>
                      <span style={{fontWeight:700,color:"#8dd45c",fontSize:16}}>₺{fmt(s.toplam)}</span>
                    </div>
                  </div>
                ) : (
                  /* DESKTOP SATIR */
                  <div key={s.id} style={{
                    display:"grid",
                    gridTemplateColumns:"100px 70px 100px 80px 50px 50px 80px 90px 36px",
                    padding:"11px 16px",
                    borderBottom: i < satirlar.length-1 ? "1px solid #1e2135" : "none",
                    fontSize:13, alignItems:"center", gap:8,
                    background: i%2===0 ? "transparent" : "#161821"
                  }}>
                    <span style={{color:"#888",fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}
                      title={s.mahal}>{s.mahal||"-"}</span>
                    <span style={{fontWeight:600,color:"#e8640a"}}>{s.kod}</span>
                    <span style={{color:s.isVana?"#5ba3e8":s.renkFark>0?"#e8640a":"#888",fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={s.isVana?"Net Fiyat":s.renkAd}>{s.isVana ? "NET FİYAT" : `${s.renkKod}${s.renkFark>0?` +%${s.renkFark}`:""}`}</span>
                    <span style={{color:"#aaa"}}>{s.isVana ? "-" : `${s.yukseklik} mm`}</span>
                    <span style={{color:"#aaa"}}>{s.isVana ? "-" : (s.tip && s.tip!=="-" ? s.tip : s.dilim)}</span>
                    <span style={{color:"#aaa"}}>{s.isVana ? "-" : `${s.watt}W`}</span>
                    <span>₺{fmt(s.birim)}</span>
                    <span style={{color:"#aaa"}}>{s.adet}</span>
                    <span style={{textAlign:"right",fontWeight:600,color:"#8dd45c"}}>₺{fmt(s.toplam)}</span>
                    <button onClick={()=>sil(s.id)} style={{
                      background:"none",border:"none",color:"#e05a5a",
                      cursor:"pointer",fontSize:16,padding:0,lineHeight:1
                    }}>×</button>
                  </div>
                ))}
              </div>

              {/* TOPLAM */}
              <div style={{
                marginTop:12, padding:"14px 20px",
                background:"linear-gradient(135deg,#1e2a0f,#1a2710)",
                borderRadius:10,border:"1px solid #2d4020",
                display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,
                flexWrap:"wrap"
              }}>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  <div style={{fontSize:11,color:"#5a7a3a",letterSpacing:.5}}>
                    {satirlar.length} kalem • KDV Hariç
                  </div>
                  <div style={{display:"flex",gap:20,alignItems:"baseline"}}>
                    <div>
                      <span style={{fontSize:11,color:"#888"}}>Maliyet: </span>
                      <span style={{fontSize:14,fontWeight:600,color:"#e8a87c"}}>₺{fmt(genelMaliyet)}</span>
                    </div>
                    <div>
                      <span style={{fontSize:11,color:"#888"}}>Kar: </span>
                      <span style={{fontSize:14,fontWeight:600,color:"#8dd45c"}}>₺{fmt(genelKar)}</span>
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <div>
                    <div style={{fontSize:11,color:"#888",textAlign:"right"}}>Satış Toplamı (KDV Hariç)</div>
                    <div style={{fontSize:20,fontWeight:700,color:"#8dd45c"}}>₺{fmt(genelToplam)}</div>
                    <div style={{fontSize:11,color:"#888",textAlign:"right",marginTop:4}}>+%20 KDV: ₺{fmt(kdvTutari)}</div>
                    <div style={{fontSize:11,color:"#888",textAlign:"right",marginTop:2}}>
                      KDV Dahil: <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>₺{fmt(genelToplamKdvli)}</span>
                    </div>
                  </div>
                  <button onClick={yazdir} style={{
                    background:"linear-gradient(135deg,#e8640a,#f5a623)",
                    color:"#fff",border:"none",borderRadius:8,
                    padding:"9px 18px",fontSize:13,fontWeight:700,
                    cursor:"pointer",display:"flex",alignItems:"center",gap:7,
                    letterSpacing:.3,whiteSpace:"nowrap"
                  }}>
                    🖨 Yazdır / PDF
                  </button>
                </div>
              </div>

              {/* Notlar */}
              <div style={{
                marginTop:10,padding:"10px 14px",
                background:"#1a1d27",borderRadius:8,border:"1px solid #2a2d3e",
                fontSize:11,color:"#555",lineHeight:1.8
              }}>
                • Fiyatlar fabrika teslim, KDV hariçtir. &nbsp;|&nbsp;
                • Isıl güç ∆T60 (90/70-20°C) değerleri. &nbsp;|&nbsp;
                • Standart renk: RAL 9016 Parlak Beyaz. &nbsp;|&nbsp;
                • Özel renk talepleri için %10–40 fark uygulanır.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Yardımcı ────────────────────────────────────────────────────────────────
const inputSt = {
  background:"#12141e", border:"1px solid #2a2d3e",
  borderRadius:6, padding:"9px 12px",
  color:"#e8e4dd", fontSize:13, outline:"none"
};

function Label({children}) {
  return <div style={{fontSize:11,color:"#666",fontWeight:600,letterSpacing:0.8,
    textTransform:"uppercase",marginBottom:6}}>{children}</div>;
}
function Row({label,val,accent}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",fontSize:13}}>
      <span style={{color:"#666"}}>{label}</span>
      <span style={{color:accent||"#c8c4bc",fontWeight:500}}>{val}</span>
    </div>
  );
}
