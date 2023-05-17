﻿using IdentityServer.Data;
using IdentityServer.Services;
using IdentityServer4.Models;
using IdentityServer4.Validation;

namespace IdentityServer
{
    public class UserPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly ApplicationDbContext _context;

        public UserPasswordValidator(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            var user = _context.Users.FirstOrDefault(f => f.Email == context.UserName && f.Password == HashPasswordService.HashPassword(context.Password));

            if (user != null)
            {
                context.Result = new GrantValidationResult(user.Email, "pwd");
                return Task.CompletedTask;
            }

            context.Result = new GrantValidationResult(TokenRequestErrors.UnauthorizedClient, "Invalid Credentials");
            return Task.CompletedTask;
        }
    }
}
