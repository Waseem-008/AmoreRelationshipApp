# Contributing to Amora MVP

Thank you for your interest in contributing to Amora! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on improving the project
- Help others learn and grow

## Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/amora-mvp.git
   cd amora-mvp
   ```
3. **Set up development environment** (see QUICKSTART.md)
4. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Before You Start

1. Check existing issues and PRs to avoid duplicates
2. For major changes, open an issue first to discuss
3. Ensure you understand the project architecture (see DEVELOPMENT.md)

### Making Changes

1. **Write clean code**:
   - Follow existing code style
   - Add comments for complex logic
   - Use meaningful variable names

2. **Test your changes**:
   - Run `./test.sh` to verify basic functionality
   - Test manually in all affected components
   - Add new tests if applicable

3. **Update documentation**:
   - Update README if adding features
   - Document new API endpoints
   - Update DEVELOPMENT.md for workflow changes

### Commit Messages

Follow conventional commits:

```
feat: Add weekly exercise reminder notification
fix: Resolve pairing code validation bug
docs: Update deployment instructions
refactor: Simplify session timer logic
test: Add unit tests for DataService
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Pull Request Process

1. **Update your branch**:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**:
   - Use a clear, descriptive title
   - Describe what changed and why
   - Reference related issues
   - Add screenshots for UI changes

4. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   How was this tested?
   
   ## Screenshots (if applicable)
   
   ## Checklist
   - [ ] Code follows project style
   - [ ] Self-reviewed
   - [ ] Commented complex code
   - [ ] Updated documentation
   - [ ] No new warnings
   - [ ] Added tests (if applicable)
   ```

5. **Code Review**:
   - Address reviewer feedback
   - Make requested changes
   - Re-request review when ready

## Areas for Contribution

### High Priority
- [ ] Comprehensive test suite
- [ ] Error handling improvements
- [ ] Performance optimizations
- [ ] Accessibility enhancements
- [ ] Documentation improvements

### Medium Priority
- [ ] Push notifications (server-side)
- [ ] Settings screen (iOS)
- [ ] Analytics dashboard
- [ ] Export data functionality
- [ ] Offline mode support

### Low Priority
- [ ] Dark mode toggle (currently always dark)
- [ ] Custom exercise creation
- [ ] Social sharing features
- [ ] Achievement badges

## Component-Specific Guidelines

### Backend (Supabase)

**SQL Migrations**:
- Always use migrations (no direct DB edits)
- Name files: `YYYYMMDDHHMMSS_description.sql`
- Include rollback logic when possible
- Test migrations locally first

**Edge Functions**:
- Keep functions small and focused
- Use TypeScript for type safety
- Handle errors gracefully
- Add logging for debugging
- Test with `supabase functions serve`

### Admin Panel (React)

**React Components**:
- Use functional components with hooks
- Keep components under 200 lines
- Extract reusable logic to custom hooks
- Use TypeScript for props
- Follow existing file structure

**Styling**:
- Use Tailwind CSS utility classes
- Keep custom CSS minimal
- Maintain dark theme consistency
- Ensure responsive design

### iOS App (SwiftUI)

**SwiftUI Views**:
- Keep views under 150 lines
- Extract subviews when needed
- Use `@State` for local state only
- Use `@EnvironmentObject` for shared state
- Follow MVVM pattern

**ViewModels**:
- Mark as `@MainActor`
- Use `@Published` for reactive properties
- Keep business logic here (not in views)
- Handle errors properly

**Services**:
- Make singletons for shared resources
- Use async/await for API calls
- Add proper error handling
- Document public methods

## Styling Guidelines

### TypeScript/JavaScript
```typescript
// Good
const handleSubmit = async () => {
  try {
    const result = await apiCall()
    setData(result)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Bad
const handleSubmit = async () => {
  const result = await apiCall()
  setData(result)
}
```

### Swift
```swift
// Good
func loadData() async {
    do {
        let data = try await service.fetch()
        self.items = data
    } catch {
        self.errorMessage = error.localizedDescription
    }
}

// Bad
func loadData() async {
    let data = try! await service.fetch()
    self.items = data
}
```

### SQL
```sql
-- Good
create table public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

-- Bad
CREATE TABLE users (id UUID PRIMARY KEY, email TEXT);
```

## Testing Requirements

### Backend
- All new edge functions must have basic tests
- Test error cases
- Verify RLS policies work

### Admin Panel
- Test all CRUD operations manually
- Verify responsive design
- Check error states

### iOS
- Test on both simulator and device
- Verify voice features on real device
- Test deep linking
- Check all user flows

## Documentation Standards

- Update README for user-facing changes
- Update DEVELOPMENT.md for workflow changes
- Add inline comments for complex logic
- Document API changes
- Update troubleshooting guide for new issues

## Review Criteria

Your PR will be reviewed for:

1. **Functionality**: Does it work as intended?
2. **Code Quality**: Is it clean and maintainable?
3. **Tests**: Are there adequate tests?
4. **Documentation**: Is it properly documented?
5. **Performance**: Does it impact performance?
6. **Security**: Are there security concerns?
7. **Style**: Does it follow project conventions?

## Questions?

- Open an issue for questions
- Join discussions
- Ask for help in PR comments

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Amora! 🎉
