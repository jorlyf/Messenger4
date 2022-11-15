using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Primitives;
using System.Text;
using api.DbContexts;
using api.Repositories;
using api.Services.Auth;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<DataContext>(options =>
{
	options.UseSqlite($"Data Source={Environment.CurrentDirectory}/messenger.db");
	if (builder.Environment.IsDevelopment())
	{
		options.LogTo(Console.WriteLine, LogLevel.Information);
	}
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
	options.RequireHttpsMetadata = false;
	options.SaveToken = true;
	options.TokenValidationParameters = new TokenValidationParameters()
	{
		ClockSkew = TimeSpan.Zero,
		RequireAudience = false,
		ValidateIssuer = false,
		ValidateAudience = false,
		ValidateLifetime = true,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
	};

	options.Events = new JwtBearerEvents
	{
		OnMessageReceived = context =>
		{
			StringValues accessToken = context.Request.Query["access_token"];
			PathString path = context.HttpContext.Request.Path;
			if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/api/hubs"))
			{
				context.Token = accessToken;
			}
			return Task.CompletedTask;
		}
	};
});

#region Custom services

// Singleton
builder.Services.AddSingleton<JwtService>();
builder.Services.AddSingleton<HashService>();

// Scoped
builder.Services.AddScoped<UnitOfWork>();
builder.Services.AddScoped<LoginService>();
builder.Services.AddScoped<RegistrationService>();

#endregion

builder.Services.AddCors(options =>
{
	options.AddPolicy("Development", policy =>
	{
		policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
	options.AddPolicy("Production", policy =>
	{
		policy.WithOrigins("http://localhost", "https://localhost")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
});

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseCors("Development");
}
else
{
	app.UseCors("Production");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
