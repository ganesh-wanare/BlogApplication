using CodePulse.Api.Models.Domain;

namespace CodePulse.Api.Repositories.Interface
{
    public interface IBlogPostRepository
    {
        Task<BlogPost> CreateAsync(BlogPost blogPost);
    }
}
