using CodePulse.Api.Data;
using CodePulse.Api.Models.Domain;
using CodePulse.Api.Repositories.Interface;

namespace CodePulse.Api.Repositories.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext dbContext;

        public BlogPostRepository(ApplicationDbContext dbContext) 
        {
            this.dbContext = dbContext;
        }
        public async Task<BlogPost> CreateAsync(BlogPost blogPost)
        {
            await dbContext.BlogPosts.AddAsync(blogPost);
            await dbContext.SaveChangesAsync();
            return blogPost;
        }
    }   
}
