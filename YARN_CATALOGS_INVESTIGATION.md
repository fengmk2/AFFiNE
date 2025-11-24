# Yarn Catalogs Investigation

## Objective
Convert Yarn dependencies to catalogs mode as documented at https://yarnpkg.com/features/catalogs

## Investigation Summary

### Analysis Completed
- Analyzed 118 package.json files across the monorepo
- Identified 131 common dependencies used across multiple packages
- Created catalog structure with proper format
- Updated 114 packages to use `catalog:` protocol (1173 total replacements)

### Dependencies with Multiple Versions
The catalog would unify these conflicting versions:
- **lit**: ^3.2.0 (66x) vs ^3.2.1 (2x)
- **zod**: ^3.23.8 (53x) vs ^3.24.1 (8x)  
- **yjs**: ^13.6.21 (45x) vs ^13.6.23 (1x) vs ^13.6.24 (1x)
- **vitest**: 3.1.3 (28x) vs ^3.2.3 (1x) vs ^3.0.6 (1x)
- **typescript**: ^5.7.2 (10x) vs ^5.5.4 (2x) vs ^5.8.3 (1x)
- And 28 more dependencies with version conflicts

### Technical Implementation

#### Catalog Structure (package.json)
```json
{
  "catalogs": {
    "default": {
      "@blocksuite/icons": "^2.2.17",
      "lodash-es": "^4.17.21",
      "rxjs": "^7.8.1",
      "zod": "^3.23.8",
      ...
    }
  }
}
```

#### Usage in Packages
```json
{
  "dependencies": {
    "lodash-es": "catalog:",
    "rxjs": "catalog:",
    "zod": "catalog:"
  }
}
```

## Issue Discovered

### Yarn 4.9.1 (Original Version)
```
Error: @capacitor/cli@catalog: isn't supported by any available resolver
```

### Yarn 4.12.0 (Latest Stable)
```  
Error: @capacitor/cli@catalog:: default catalog not found or empty
```

Despite correct configuration in both package.json and .yarnrc.yml formats, the catalog resolution fails.

### Testing Methodology
1. Created minimal test cases with simple catalog definitions
2. Tested with both package.json and .yarnrc.yml catalog locations
3. Tried named catalogs vs default catalog
4. Upgraded to latest Yarn version (4.12.0)
5. All tests consistently failed with "catalog not found or empty"

## Conclusion

The Yarn catalogs feature appears to be:
- **Documented** on the official Yarn website
- **Partially implemented** in Yarn 4.12.0 (error changed, showing recognition)
- **Not functional** in current stable releases
- Possibly **in development** or requiring unreleased Yarn version

## Recommendations

### Option 1: Wait for Yarn Feature Maturity (Recommended)
- Monitor Yarn releases for full catalogs support
- Revisit implementation when feature is stable
- Current effort can be reused when ready

### Option 2: Use Alternative Approaches Now
- **Yarn Resolutions**: Already in use, enforces versions
- **Workspace Protocol**: Use `workspace:*` for internal packages (already done)
- **Version Constraints**: Use Yarn constraints feature (different approach)

### Option 3: Custom Tooling
- Create scripts to validate version consistency
- Implement pre-commit hooks to check for version drift
- Less elegant but functional today

## Files Prepared (Not Committed)

The following changes were prepared and tested:
- Root package.json with 131 cataloged dependencies
- 114 package.json files updated with `catalog:` protocol
- 1173 total dependency references converted
- Yarn upgraded from 4.9.1 to 4.12.0

These changes are ready to be applied when the Yarn feature becomes functional.

## Next Steps

1. **Monitor Yarn Releases**
   - Check Yarn 5.x when released
   - Review Yarn GitHub issues/PRs related to catalogs
   - Test with future canary builds

2. **Alternative Implementation**
   - If catalogs remain unavailable, implement version consistency checks via:
     - Custom validation scripts
     - Yarn constraints (different feature)
     - Renovate/Dependabot configuration

3. **Documentation**
   - Keep this investigation document for future reference
   - Update when Yarn catalogs become available
   - Share findings with team

## Technical Details

### Most Common Dependencies (Top 20)
1. rxjs: 78 usages
2. @preact/signals-core: 69 usages
3. lit: 68 usages
4. @toeverything/theme: 68 usages
5. zod: 61 usages
6. lodash-es: 54 usages
7. @types/lodash-es: 49 usages
8. yjs: 48 usages
9. @floating-ui/dom: 41 usages
10. minimatch: 33 usages
11. vitest: 30 usages
12. typescript: 13 usages
13. react: 13 usages
14. @types/mdast: 13 usages
15. date-fns: 11 usages
16. react-dom: 11 usages
17. @types/react: 10 usages
18. react-router-dom: 10 usages
19. @types/node: 9 usages
20. nanoid: 9 usages

These would benefit most from catalog management once the feature is available.

---

**Date**: November 24, 2025  
**Yarn Version Tested**: 4.9.1, 4.12.0  
**Status**: Feature not yet functional in stable Yarn releases
