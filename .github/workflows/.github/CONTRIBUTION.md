
# Contributing to GIMSOI

## Before You Start
- [ ] Git configured locally

## Workflow

1. Create feature branch
git checkout -b feature/your-name
2. Make changes

3. Commit with format
git commit -m "feat(backend): add new feature"
git commit -m "fix(frontend): resolve bug"
git commit -m "security(auth): fix vulnerability"
4. Push
git push origin feature/your-name
5. Create PR on GitHub

6. Wait for:
   - CI/CD ✅ (green)
   - 2 approvals
   - Code owner review

7. Merge PR

## Rules

- ❌ No direct pushes to main
- ❌ No hardcoded secrets
- ❌ No console.log in production
- ✅ PR template required
- ✅ Tests added
- ✅ Security checklist complete

## Branch Naming

- `feature/name` - New feature
- `bugfix/name` - Bug fix
- `security/name` - Security fix
- `docs/name` - Documentation

## Commit Format

✅ Good:
- "feat(backend): add user auth"
- "fix(frontend): resolve button styling"
- "security: implement CSRF protection"

❌ Bad:
- "fixed stuff"
- "updated"
- "blah blah"

## Questions? @petekananelo31@gmail.comn
