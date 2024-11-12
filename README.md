# README

## Contents
- [Project Structure](#project-structure)
- [Instructions](#instructions)
    - [Initial Setup](#initial-setup)
    - [Database Setup](#database-setup)
    - [Cors - communication between front and backend](#ensuring-communication-is-allowed-between-front-and-backend)

    - 

## Project Structure

The root folder will be a dotnet project. A Subfolder will be the Ionic React frontend.

## Project commands and links

### Backend Commands
run app
```
dotnet run
```

starts backend at
`http://localhost:5000/`

get notes route
`http://localhost:5000/api/notes`

create executable
```
dotnet publish -c Release -r win-x64 --self-contained
```

### Frontend Commands

run app
```
ionic serve
```

starts app at `http://localhost:8100/` if running locally. If running with the executable it will be the same address as the backend `http://localhost:5000/`.

## Instructions

### Initial Setup

1. initialize dotnet project
```
dotnet new webapi -n NoteApp2
cd NoteApp2
```

2. intialize frontend ionic react project
```
ionic start NoteApp2 blank --type=react
```

3. remove .git from frontend

4. add .gitignore

5. initialize git repo in root
```
git init
```

### Database Setup

1. Install Needed packages
```
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

2. Configure Entity Framework Core and SQLite

- Create a new Models directory and add a Note.cs file for your data model:

- Create a new Data directory and add a NoteContext.cs file for your database context:

- Configure the database context in Startup.cs:

- setup Program.cs to use Startup.cs file

3. Creating the API controller

- Create a new Controllers directory and add a NotesController.cs file for your API controller:

4. Initialize database

- Add a migration and update the database:

```
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Ensuring communication is allowed between front and backend

1. Adding Cors

- First, you need to install the Microsoft.AspNetCore.Cors package. Open a terminal in your backend project directory and run

```
dotnet add package Microsoft.AspNetCore.Cors
```

- add code to Starup.css to enable Cors

### Setup Frontend

### Executable

- Note.csproj
add the following code to NoteApp.csproj. This tells it which folder to look for the static files for the frontend. Where the script is to build the frontend and then copy it to wwwroot. Also when to run that script.

```  <ItemGroup>
    <Content Include="wwwroot\**\*" CopyToPublishDirectory="PreserveNewest" />
  </ItemGroup>

  <PropertyGroup>
    <PrePublishScript>buildCopyFront.sh</PrePublishScript>
  </PropertyGroup>

  <Target Name="PrePublish" BeforeTargets="Publish">
    <Exec Command="bash $(PrePublishScript)" />
  </Target>
```

- `buildCopyFront.sh`
Add this file to use in .csproj 