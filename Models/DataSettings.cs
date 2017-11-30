using System;
using System.Globalization;
using AutoMapper;


namespace WeeGames.Models
{

    // Custom exception class for throwing application specific exceptions (e.g. for validation) 
    // that can be caught and handled within the application
    public class AppException : Exception
    {
        public AppException() : base() {}
 
        public AppException(string message) : base(message) { }
 
        public AppException(string message, params object[] args) 
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }

    public class AppSettings
    {
        public string Secret { get; set; }
    }
    }
    
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}
