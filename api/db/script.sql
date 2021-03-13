/****** Object:  Table [dbo].[Autos]    Script Date: 13/03/2021 12:17:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Autos](
	[Id] [tinyint] NOT NULL,
	[Marca] [varchar](60) NOT NULL,
	[Modelo] [varchar](60) NOT NULL,
	[Valor_comercial] [numeric](18, 2) NOT NULL,
	[Url_imagen] [varchar](300) NOT NULL,
	[Plan_financiamiento] [tinyint] NOT NULL,
 CONSTRAINT [PK_Autos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clientes]    Script Date: 13/03/2021 12:17:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clientes](
	[Id] [tinyint] NOT NULL,
	[Nombres] [varchar](50) NOT NULL,
	[Apellido_paterno] [varchar](30) NOT NULL,
	[Apellido_materno] [varchar](30) NOT NULL,
	[Curp] [char](18) NOT NULL,
	[Domicilio] [varchar](200) NOT NULL,
	[Id_estado_civil] [tinyint] NOT NULL,
 CONSTRAINT [PK_Clientes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Estado_civil]    Script Date: 13/03/2021 12:17:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estado_civil](
	[Id] [tinyint] NOT NULL,
	[Descripcion] [varchar](30) NOT NULL,
	[Id_hijos] [tinyint] NOT NULL,
	[Ingreso_acumulable] [numeric](18, 2) NOT NULL,
 CONSTRAINT [PK_Estado_civil] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Hijos]    Script Date: 13/03/2021 12:17:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Hijos](
	[Id] [tinyint] NOT NULL,
	[Cantidad_ini] [tinyint] NOT NULL,
	[Cantidad_fin] [tinyint] NOT NULL,
 CONSTRAINT [PK_Hijos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Plan_sugerido]    Script Date: 13/03/2021 12:17:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Plan_sugerido](
	[Id] [tinyint] NOT NULL,
	[Ingreso_acumulable_ini] [int] NOT NULL,
	[Ingreso_acumulabe_fin] [int] NOT NULL,
	[Plan_financiamiento_sug] [tinyint] NOT NULL,
 CONSTRAINT [PK_Plan_sugerido] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Planes_financiamiento]    Script Date: 13/03/2021 12:17:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Planes_financiamiento](
	[Id] [tinyint] NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[Precio_inicial] [numeric](18, 2) NOT NULL,
	[Precio_limite] [numeric](18, 2) NOT NULL,
 CONSTRAINT [PK_Planes_financiamiento] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (1, N'TOYOTA', N'YARIS 1.5 S', CAST(163000.00 AS Numeric(18, 2)), N'https://realcartest.com/wp-content/uploads/2019/02/Toyota-yaris-s-2019-2.jpg', 1)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (2, N'TOYOTA', N'YARIS 1.5 CORE AUTO', CAST(173200.00 AS Numeric(18, 2)), N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPtGSjBhqm2yOPJZ4jIsMsTKUmxeUIBbUlzA&usqp=CAU', 1)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (3, N'VOLKSWAGEN', N'VIRTUS 1.6', CAST(189990.00 AS Numeric(18, 2)), N'https://dam.automovilonline.com.mx/wp-content/uploads/2019/10/open-1.jpg', 1)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (4, N'NISSAN', N'	VERSA 1.6 SENSE', CAST(144001.00 AS Numeric(18, 2)), N'https://www.proyectar.com.mx/i/versa_g1.jpg', 1)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (5, N'VOLKSWAGENVOLKSWAGEN', N'	VENTO 1.6 STARTLINE', CAST(200990.00 AS Numeric(18, 2)), N'https://soloautos.li.csnstatic.com/soloautos/car/private/ds90at1hq3v9xaffxgggkds8c.jpg?pxc_method=crop&height=725&width=1087', 1)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (6, N'FIAT', N'UNO 1.4 WAY', CAST(196900.00 AS Numeric(18, 2)), N'https://combustibleco.com/imgs/t650/consumo-uno-way-1-4-dualogic.jpg', 1)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (7, N'CHEVROLET', N'TRAX 1.8 LS A', CAST(324900.00 AS Numeric(18, 2)), N'https://i.blogs.es/e8b2ee/650_1000_chevrolet-20trax_/450_1000.jpg', 2)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (8, N'CHEVROLET', N'TORNADO 1.8 LS A', CAST(275900.00 AS Numeric(18, 2)), N'https://img.automexico.com/2020/09/11/2gS0vPdI/tornado1-0100.jpg', 2)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (9, N'VOLKSWAGEN', N'T-CROSS 1.6 TRENDLINE', CAST(344990.00 AS Numeric(18, 2)), N'https://fotos.perfil.com/2019/06/05/trim/1280/720/volkswagen-t-cross-hero-724650.jpg', 2)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (10, N'SUZUKI', N'SWIFT 1.2 GLX CVT', CAST(287990.00 AS Numeric(18, 2)), N'https://autoblog.com.ar/wp-content/uploads/2018/11/SUZUKISWIFT1.jpg', 2)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (11, N'RENAULT', N'	STEPWAY 1.6 ZEN MT', CAST(245000.00 AS Numeric(18, 2)), N'https://i.blogs.es/ba4ea1/renault-stepway-2020_/1366_2000.jpg', 2)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (12, N'KIA', N'SOUL 2.0 EX IVT AUTO', CAST(357900.00 AS Numeric(18, 2)), N'https://i.blogs.es/172572/kia-soul-2019_/840_560.jpg', 2)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (13, N'KIA', N'SORENTO 2.4 EX AUTO', CAST(520900.00 AS Numeric(18, 2)), N'https://i.blogs.es/8b5466/kia-sorento_us-version-2019-1024-02/1366_2000.jpg', 3)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (14, N'CHEVROLET', N'SILVERADO 1500 4.3', CAST(662500.00 AS Numeric(18, 2)), N'https://es.chevrolet.com/content/dam/chevrolet/na/us/english/retail/january-2021/phase-1/movs/01-images/2020-silverado-1500-trail-boss-mov.jpg?imwidth=960', 3)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (15, N'TOYOTA', N'SIENNA 3.5 CE AUTO', CAST(551400.00 AS Numeric(18, 2)), N'https://http2.mlstatic.com/D_NQ_NP_752598-MLM44494355843_012021-O.jpg', 3)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (16, N'BMW', N'SERIES 3 2.0 320IA EXECUTIVE AUTO', CAST(679900.00 AS Numeric(18, 2)), N'https://dam.automovilonline.com.mx/wp-content/uploads/2019/11/bmwserie3202002.jpg', 3)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (17, N'NISSAN', N'SENTRA 1.8 EXCLUSIVE AUTO', CAST(390402.00 AS Numeric(18, 2)), N'https://autoblog.com.ar/wp-content/uploads/2016/09/NISSANSENTRA1.jpg', 3)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (18, N'JAC', N'	SEI7 2.0T QUANTUM DCT', CAST(509000.00 AS Numeric(18, 2)), N'https://i.blogs.es/0f82b2/jac-sei-7_/450_1000.jpg', 3)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (19, N'KIA', N'SEDONA 3.3 SXL AUTO', CAST(834900.00 AS Numeric(18, 2)), N'https://img.automexico.com/2020/07/02/rkwP8Fam/kia-sedona-sxl-8-cc34.jpg', 4)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (20, N'HYUNDAI', N'SANTA FE 2.0 LIMITED TECH AUTO', CAST(725900.00 AS Numeric(18, 2)), N'https://img.automexico.com/2020/02/19/0M2xJlFh/2020-santa-fe-gallery-1920x1200-ext-05-2f7f.jpg', 4)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (21, N'MERCEDES', N'S-CLASS 5.5 MERCEDES-AMG S 63 DCT 4WD', CAST(4430000.00 AS Numeric(18, 2)), N'https://i.ytimg.com/vi/7PDupE1N8i0/maxresdefault.jpg', 4)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (22, N'ACURA', N'RDX 2.0 A-SPEC AUTO 4WD', CAST(849900.00 AS Numeric(18, 2)), N'https://www.acura.ca/Content/acura.ca/761108e1-3e31-4a28-8168-8f9ac7f2c18e/LargeSizedFeature/03_rdx19_overview_MediumFeature_mobile.jpg', 4)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (23, N'LAND ROVER', N'RANGE ROVER VELAR 3.0 V6 P380 R-DYNAMIC SE AUTO 4WD', CAST(1424900.00 AS Numeric(18, 2)), N'https://soloautos.li.csnstatic.com/soloautos/cars/dealer/87e8r9f301mh0lopkp3m5bmpy.jpg?pxc_method=gravityfill&pxc_bgtype=self&height=725&width=1087', 4)
INSERT [dbo].[Autos] ([Id], [Marca], [Modelo], [Valor_comercial], [Url_imagen], [Plan_financiamiento]) VALUES (24, N'RAM', N'RAM 1500 5.7 MHEV LONGHORN CREW CAB AUTO 4WD', CAST(1068900.00 AS Numeric(18, 2)), N'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/l/RT_V_0c2043d710a14676841d6198e37ae207.jpg', 4)
GO
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (0, N'Edbert Alan', N'Bajo', N'Ruiz', N'BARE000118HSLJZDA8', N'Bartolome de las casas, #449', 1)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (1, N'MARTINA', N'ALTAMIRANO', N'CALDERON', N'AACM651123MTSLLR06', N'Angel Flores,#123', 3)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (2, N'ZULEIMA GABRIELA', N'ORDO
ÑES', N'ALANIS', N'OOAZ900824MTSRLL08', N'Maria Angeles,#321', 5)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (3, N'MARISOL', N'SANCHEZ', N'PEREZ', N'SAPM880429MTSNRR00', N'Av. Niños Héroes esquina con Adolfo Ruiz
Cortínez, Casa Ejidal de la Estancia, C.P.28610
', 2)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (4, N'MAGDALENA', N'GONZALEZ', N'RODRIGUEZ', N'GORM680121MTSNDG06', N'Sociedad Cooperativa de Artesanías Pueblo
Blanco, Km 7 carretera Villa de Álvarez –
Comala, C.P28450', 2)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (5, N'GUADALUPE', N'RODRIGUEZ', N'BARTOLO', N'ROBG900321MTSDRD01', N'Parque Hidalgo (Concha Acústica),Colima
Centro, Belisario Domínguez/20 de noviembre,
C.P.28000', 5)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (6, N'YULETH ARELY', N'ORTIZ', N'RODRIGUEZ', N'OIRY910429MTSRDL02', N'V. Carranza no. 21-B, Colonia Centro
Cuauhtémoc, Col., (Casa de Ma. Elena),
C.P.28500', 1)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (7, N'JUAN', N'ESPINOZA', N'RODRIGUEZ', N'EIRJ720502HTSSDN06', N'o Prol. Hidalgo u José Barajas Carrillo, Jardín de
Colinas del Carmen, Col. Colinas del Carme, Villa
de Álvarez, Col., C.P.28978', 2)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (8, N'SALOME', N'RIVERA', N'VAZQUEZ', N'RIVS770301HTSVZL05', N'Roberto Suárez y Susana Ortiz, Colonia Ramón
Serrano, Villa de Álvarez, Col., C.P.28984', 1)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (9, N'EMMA PAULA', N'SOLIS', N'RAMIREZ', N'SORE610611MTSLMM04', N'Benito Juárez no. 91 esq. con Nuevo León
Colonia Centro, Armería, Col., C.P.28600
', 5)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (10, N'DANIEL', N'TINAJERO', N'TRISTAN', N'TITD600101HTSNRN09', N'Calle Honduras no. 24, Centro, Madrid, Colima,
C.P28910
', 4)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (11, N'MA. GUADALUPE', N'MORENO', N'CASTILLO', N'MOCG481211MTSRSD25', N'Casa ejidal de Santiago, Francisco I. Madero no.
27, Santiago, Colima. C.P28863', 3)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (12, N'JOSE GUADALUPE', N'MEDINA', N'RODRIGUEZ', N'MERG690406HTSDDD03', N'AV Elías Zamora Verduzco #1502, Casino de la
Feria, C.P. 28869', 2)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (13, N'FRANCISCO JAVIER', N'CASTILLO', N'LEDESMA', N'CALF631005HTSSDR02', N'Av. López Mateos, Col. Las Joyas,
Manzanillo, Col., C.P. 28863', 2)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (14, N'SALVADOR', N'GALLARDO', N' MEDINA', N'GAMS661004HTSLDL05', N'Local de Narciso Arias, Mártires del Tacamo
s/n, Minatitlán, Col. CP:28750', 2)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (15, N'MIGUEL ANGEL', N'SEGURA', N'COPADO', N'SECM620929HTSGPG06', N'Local de la Ganadera. Calle mercurio s/n
Colonia Tepeyac, Tecomán, Col., C.P.28110', 2)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (16, N'TERESO', N'ALVAREZ', N'LOPEZ', N'AALT601015HTSLPR00', N'Parque Insurgentes, Marciano Cabrera y Av.
Insurgentes, Tecomán, Colima, C.P. 28110', 1)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (17, N'EFRAIN', N'GONZALEZ', N'RUBIO', N'GORE781222HTSNBF01', N'Armonía no. 381, Colonia Niños Héroes. Colima,
Colima(Local de periodistas), C.P. 28025', 3)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (18, N'GILBERTO', N'MARTINEZ', N'MARTINEZ', N'MAMG940610HTSRRL03', N'Centenario no. 638. Colonia Niños Héroes, Villa
de Álvarez, (local de Ante), C.P.28025
', 3)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (19, N'ADA NELLY', N'TORRES', N'RODRIGUEZ', N'TORA780313MTSRDD04', N'V. Carranza no. 21-B. Colonia Centro
Cuauhtémoc, Col. (casa de Ma. Elena), C.P28500
', 3)
INSERT [dbo].[Clientes] ([Id], [Nombres], [Apellido_paterno], [Apellido_materno], [Curp], [Domicilio], [Id_estado_civil]) VALUES (20, N'CANDELARIO', N'TINAJERO', N'PAZ', N'TIPC490202HTSNZN07', N'Sociedad Cooperativa de Artesanías Pueblo
Blanco, Km 7 carretera Villa de Álvarez – Comala.,
C.P. 28450', 4)
GO
INSERT [dbo].[Estado_civil] ([Id], [Descripcion], [Id_hijos], [Ingreso_acumulable]) VALUES (1, N'Soltero', 1, CAST(0.80 AS Numeric(18, 2)))
INSERT [dbo].[Estado_civil] ([Id], [Descripcion], [Id_hijos], [Ingreso_acumulable]) VALUES (2, N'Casado sin hijos', 1, CAST(0.70 AS Numeric(18, 2)))
INSERT [dbo].[Estado_civil] ([Id], [Descripcion], [Id_hijos], [Ingreso_acumulable]) VALUES (3, N'Casado con 1 hijo', 2, CAST(0.60 AS Numeric(18, 2)))
INSERT [dbo].[Estado_civil] ([Id], [Descripcion], [Id_hijos], [Ingreso_acumulable]) VALUES (4, N'Casado con 2 hijos', 3, CAST(0.55 AS Numeric(18, 2)))
INSERT [dbo].[Estado_civil] ([Id], [Descripcion], [Id_hijos], [Ingreso_acumulable]) VALUES (5, N'Casado con 3 hijos o mas', 4, CAST(0.50 AS Numeric(18, 2)))
GO
INSERT [dbo].[Hijos] ([Id], [Cantidad_ini], [Cantidad_fin]) VALUES (1, 0, 0)
INSERT [dbo].[Hijos] ([Id], [Cantidad_ini], [Cantidad_fin]) VALUES (2, 1, 1)
INSERT [dbo].[Hijos] ([Id], [Cantidad_ini], [Cantidad_fin]) VALUES (3, 2, 2)
INSERT [dbo].[Hijos] ([Id], [Cantidad_ini], [Cantidad_fin]) VALUES (4, 3, 20)
GO
INSERT [dbo].[Plan_sugerido] ([Id], [Ingreso_acumulable_ini], [Ingreso_acumulabe_fin], [Plan_financiamiento_sug]) VALUES (1, 0, 5000, 1)
INSERT [dbo].[Plan_sugerido] ([Id], [Ingreso_acumulable_ini], [Ingreso_acumulabe_fin], [Plan_financiamiento_sug]) VALUES (2, 5001, 10000, 2)
INSERT [dbo].[Plan_sugerido] ([Id], [Ingreso_acumulable_ini], [Ingreso_acumulabe_fin], [Plan_financiamiento_sug]) VALUES (3, 10001, 18000, 3)
INSERT [dbo].[Plan_sugerido] ([Id], [Ingreso_acumulable_ini], [Ingreso_acumulabe_fin], [Plan_financiamiento_sug]) VALUES (4, 18001, 999999, 4)
GO
INSERT [dbo].[Planes_financiamiento] ([Id], [Descripcion], [Precio_inicial], [Precio_limite]) VALUES (1, N'Todos pueden', CAST(0.00 AS Numeric(18, 2)), CAST(220000.00 AS Numeric(18, 2)))
INSERT [dbo].[Planes_financiamiento] ([Id], [Descripcion], [Precio_inicial], [Precio_limite]) VALUES (2, N'Estrena auto', CAST(220000.01 AS Numeric(18, 2)), CAST(380000.00 AS Numeric(18, 2)))
INSERT [dbo].[Planes_financiamiento] ([Id], [Descripcion], [Precio_inicial], [Precio_limite]) VALUES (3, N'Premium', CAST(380000.01 AS Numeric(18, 2)), CAST(680000.00 AS Numeric(18, 2)))
INSERT [dbo].[Planes_financiamiento] ([Id], [Descripcion], [Precio_inicial], [Precio_limite]) VALUES (4, N'Luxury', CAST(680000.01 AS Numeric(18, 2)), CAST(999999999.99 AS Numeric(18, 2)))
GO
ALTER TABLE [dbo].[Autos]  WITH CHECK ADD  CONSTRAINT [FK__Autos__au_Plan_f__38996AB5] FOREIGN KEY([Plan_financiamiento])
REFERENCES [dbo].[Planes_financiamiento] ([Id])
GO
ALTER TABLE [dbo].[Autos] CHECK CONSTRAINT [FK__Autos__au_Plan_f__38996AB5]
GO
ALTER TABLE [dbo].[Clientes]  WITH CHECK ADD FOREIGN KEY([Id_estado_civil])
REFERENCES [dbo].[Estado_civil] ([Id])
GO
ALTER TABLE [dbo].[Estado_civil]  WITH CHECK ADD FOREIGN KEY([Id_hijos])
REFERENCES [dbo].[Hijos] ([Id])
GO
ALTER TABLE [dbo].[Plan_sugerido]  WITH CHECK ADD FOREIGN KEY([Plan_financiamiento_sug])
REFERENCES [dbo].[Planes_financiamiento] ([Id])
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1.- >0 - <220,000.00, 2.- >220.001.00 - <380,000.00, 3.- >380,001.00 - <680,000.00, 4.- >680,001.00 - <Infinito' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Autos', @level2type=N'COLUMN',@level2name=N'Plan_financiamiento'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Estado_civil', @level2type=N'COLUMN',@level2name=N'Ingreso_acumulable'
GO
