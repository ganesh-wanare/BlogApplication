using CodePulse.Api.Models.Domain;
using CodePulse.Api.Models.DTO;
using CodePulse.Api.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogPostRepository blogPostRepository;

        public BlogPostController(IBlogPostRepository blogPostRepository) 
        {
            this.blogPostRepository = blogPostRepository;
        }
        //Post: {apiBaseUrl}/api/blogposts
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDTO request)
        {
            //Create DTO to Domain Model
            var blogPost = new BlogPost
            {
                Author = request.Author,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                IsVisible = request.IsVisible,
                UrlHandle = request.UrlHandle,
                PublishedDate = request.PublishedDate,
            };

            blogPost = await blogPostRepository.CreateAsync(blogPost);

            // Covert domain model back to DTO
            var response = new BlogPostDTO
            {
                Id = blogPost.Id,
                Author = blogPost.Author,
                Content = blogPost.Content,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                PublishedDate = blogPost.PublishedDate,
                ShortDescription = blogPost.ShortDescription,
                Title = blogPost.Title,
                IsVisible = blogPost.IsVisible,
                UrlHandle = blogPost.UrlHandle,
            };

            return Ok(response);
        }


    }
}
