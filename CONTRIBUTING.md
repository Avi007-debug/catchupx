# Contributing to CatchUpX

Thank you for your interest in contributing to CatchUpX! This document provides guidelines and instructions for contributing.

## 🌟 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/catchupx/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/environment details

### Suggesting Enhancements
1. Check existing feature requests
2. Create a new issue with:
   - Clear description of the feature
   - Why it would be useful
   - Possible implementation approach

### Pull Requests

#### Setup Development Environment
```bash
# Fork and clone
git clone https://github.com/yourusername/catchupx.git
cd catchupx

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup
cd ../backend
pip install -r requirements.txt
```

#### Making Changes
1. Create a branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test thoroughly
4. Commit with clear messages: `git commit -m "Add: feature description"`
5. Push: `git push origin feature/your-feature-name`
6. Open Pull Request

#### Code Style
- **TypeScript/React**: Follow ESLint rules
- **Python**: Follow PEP 8
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

#### Commit Messages
```
Add: New feature
Fix: Bug fix
Update: Improve existing feature
Refactor: Code restructuring
Docs: Documentation changes
Style: Formatting changes
Test: Add or update tests
```

### Development Guidelines

#### Frontend
- Use TypeScript for type safety
- Follow React hooks best practices
- Use shadcn/ui components when possible
- Keep components small and reusable
- Test on multiple screen sizes

#### Backend
- Keep Lambda functions stateless
- Add error handling for all edge cases
- Log important events for debugging
- Optimize for cold start performance
- Document all API changes

#### Testing
- Test all user flows manually
- Verify API responses
- Check error states
- Test on different browsers
- Verify mobile responsiveness

## 📋 Code Review Process

1. PR is submitted
2. Automated checks run (if configured)
3. Maintainer reviews code
4. Changes requested if needed
5. PR merged once approved

## 🎯 Priority Areas

Current focus areas where contributions are especially welcome:
- [ ] Additional quiz questions for all grades
- [ ] More subject coverage
- [ ] Accessibility improvements
- [ ] Performance optimizations
- [ ] Documentation improvements

## 📞 Questions?

Feel free to open an issue for any questions about contributing!

Thank you for helping make CatchUpX better! 🎓
