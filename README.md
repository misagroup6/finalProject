INSTRUCTION TO CONNECT DATABASE

I assume that you have installed SQL Server Management Studio (SSMS)

1/create database using command
-Open SSMS
-In Object Explorer, right click on your server, choose New Query
-Paste these commands to new query and click Execute:

Create Database EmployeeDB
Go

Use EmployeeDB
Go

Create table Employees(
	ID int primary key identity,
	MaNhanVien nvarchar(20),
	HoVaTen nvarchar(50),
	GioiTinh nvarchar(10),
	NgaySinh date,
	DiaChi nvarchar(200),
	DienThoai nvarchar(20),
	Email nvarchar(30),
	ViTriCongViec nvarchar(100),
	DonViCongTac nvarchar(100)
)
Go

-Restart SSMS

2/modify connection in visual studio
-click on Server Explorer(on the left sidebar)
-click on the arrow next to Data Connections
-right click on EmployeeDBEntities and choose Modify connection
-change Server name to your server name (see in Sql Server Management Studio), Username, Password
-click test connection => succeeded => OK to save
-go to EmployeeDataAccess project, open App.config, find <connectionStrings>, edit data source=<your servername>, user id=<your id>, password=<your password> => Save
-go to MISA_WDT_HeroDev_Nhom6 project, open Web.config, find <connectionStrings>, do the same as above
-run

3/running
-Open "Khách hàng" tab as shown in Giang's instruction
-To add new employee, click "Thêm", fill in information, then click "Cắt" to save
-Reopen "Khách hàng" tab to check newly added employee

*Note: New employee with duplicated ID will not be added to database
