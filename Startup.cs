using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using NoteAppBackend.Data;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Add CORS policy
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
            builder =>
            {
                builder.WithOrigins("http://localhost:8100", "http://localhost:5000")
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
        });

        services.AddDbContext<NoteContext>(options =>
            options.UseSqlite("Data Source=notes.db"));

        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, NoteContext context)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();

        app.UseCors("AllowSpecificOrigin");

        app.UseStaticFiles(new StaticFileOptions {
            FileProvider = new PhysicalFileProvider(
                Path.Combine(env.ContentRootPath, "wwwroot")),
            RequestPath = ""
        });

        // Apply migrations to ensure the database schema is up-to-date
        context.Database.Migrate();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapFallbackToFile("/index.html"); // ensures routing works for single page applications
        });
    }
}
