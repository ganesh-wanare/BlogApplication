using CodePulse.Api.Models.Domain;

namespace CodePulse.Api.Repositories.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);
    }
}
