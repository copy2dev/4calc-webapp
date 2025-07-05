#!/usr/bin/env node

/**
 * 4Calc Release Management Script
 * Handles version bumping, changelog updates, and release preparation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Release types
const RELEASE_TYPES = {
  patch: 'patch',
  minor: 'minor', 
  major: 'major'
};

// Get command line arguments
const args = process.argv.slice(2);
const releaseType = args[0];
const releaseNotes = args[1];

if (!releaseType || !RELEASE_TYPES[releaseType]) {
  console.log('❌ Usage: node release.js <patch|minor|major> [release-notes]');
  console.log('');
  console.log('Examples:');
  console.log('  node release.js patch "Bug fixes and minor improvements"');
  console.log('  node release.js minor "New calculator and features"');
  console.log('  node release.js major "Breaking changes and redesign"');
  process.exit(1);
}

// Current version
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const currentVersion = packageJson.version || '1.0.0';

// Calculate new version
function bumpVersion(version, type) {
  const parts = version.split('.').map(Number);
  
  switch(type) {
    case 'patch':
      parts[2]++;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
  }
  
  return parts.join('.');
}

const newVersion = bumpVersion(currentVersion, releaseType);
const releaseDate = new Date().toISOString().split('T')[0];

console.log('🚀 4Calc Release Manager');
console.log('========================');
console.log(`📦 Current Version: ${currentVersion}`);
console.log(`📦 New Version: ${newVersion}`);
console.log(`📅 Release Date: ${releaseDate}`);
console.log(`🏷️  Release Type: ${releaseType}`);
console.log('');

// Confirm release
console.log('❓ Do you want to proceed with this release? (y/N)');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('', (answer) => {
  if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
    console.log('❌ Release cancelled');
    readline.close();
    process.exit(0);
  }
  
  readline.close();
  performRelease();
});

function performRelease() {
  console.log('🔄 Starting release process...');
  
  try {
    // 1. Update package.json
    console.log('📝 Updating package.json...');
    packageJson.version = newVersion;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    
    // 2. Update VERSION.md
    console.log('📝 Updating VERSION.md...');
    updateVersionFile();
    
    // 3. Update CHANGELOG.md
    console.log('📝 Updating CHANGELOG.md...');
    updateChangelog();
    
    // 4. Build production version
    console.log('🔧 Building production version...');
    execSync('node build.js', { stdio: 'inherit' });
    
    // 5. Create release notes
    console.log('📄 Creating release notes...');
    createReleaseNotes();
    
    // 6. Create git tag (if git is available)
    try {
      console.log('🏷️  Creating git tag...');
      execSync(`git add .`, { stdio: 'pipe' });
      execSync(`git commit -m "Release v${newVersion}"`, { stdio: 'pipe' });
      execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`, { stdio: 'pipe' });
      console.log('✅ Git tag created');
    } catch (e) {
      console.log('⚠️  Git operations skipped (not a git repository or git not available)');
    }
    
    console.log('');
    console.log('✅ Release completed successfully!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Review the generated files');
    console.log('2. Test the build in dist/ directory');
    console.log('3. Deploy to staging for testing');
    console.log('4. Get approval from stakeholders');
    console.log('5. Deploy to production');
    console.log('');
    console.log('🚀 Deployment commands:');
    console.log('  cd dist && ./docker-build.sh && ./deploy.sh');
    
  } catch (error) {
    console.error('❌ Release failed:', error.message);
    process.exit(1);
  }
}

function updateVersionFile() {
  const versionContent = `# 4Calc Version History

## v${newVersion} - ${getReleaseTitle(releaseType)} (${releaseDate})

### 🔄 Release Type: ${releaseType.toUpperCase()}

${releaseNotes ? `### 📝 Release Notes\n${releaseNotes}\n` : ''}

### ✨ Changes in this Release
${generateChangesList()}

### 🛠️ Technical Updates
- Version bumped to ${newVersion}
- Build date: ${new Date().toISOString()}
- Production build optimized

### 📋 Previous Releases
See CHANGELOG.md for detailed version history.

---

## Release Approval Status
- [ ] Code Review Completed
- [ ] Testing Completed
- [ ] Performance Testing Passed
- [ ] Security Review Passed
- [ ] Documentation Updated
- [ ] Ready for Production Deployment

**Approved by:** _[Pending]_  
**Approval Date:** _[Pending]_  
**Deployment Date:** _[Pending]_`;

  fs.writeFileSync('VERSION.md', versionContent);
}

function updateChangelog() {
  const changelogPath = 'CHANGELOG.md';
  let changelogContent = fs.readFileSync(changelogPath, 'utf8');
  
  const newEntry = `
## [${newVersion}] - ${releaseDate}

### ${getReleaseTitle(releaseType)}
${releaseNotes ? `${releaseNotes}\n` : ''}
${generateChangesList()}

### Technical Details
- **Release Type**: ${releaseType}
- **Build Date**: ${new Date().toISOString()}
- **Compatibility**: Backwards compatible${releaseType === 'major' ? ' with breaking changes' : ''}

`;

  // Insert new entry after [Unreleased] section
  const unreleasedIndex = changelogContent.indexOf('## [Unreleased]');
  if (unreleasedIndex !== -1) {
    const nextSectionIndex = changelogContent.indexOf('\n---\n', unreleasedIndex);
    if (nextSectionIndex !== -1) {
      changelogContent = changelogContent.slice(0, nextSectionIndex) + 
                       newEntry + 
                       changelogContent.slice(nextSectionIndex);
    } else {
      changelogContent += newEntry;
    }
  } else {
    changelogContent += newEntry;
  }
  
  fs.writeFileSync(changelogPath, changelogContent);
}

function createReleaseNotes() {
  const releaseNotesContent = `# Release Notes v${newVersion}

**Release Date:** ${releaseDate}  
**Release Type:** ${releaseType.toUpperCase()}

## 📋 Summary
${releaseNotes || 'Regular update with improvements and bug fixes.'}

## 🔄 Version Changes
- **Previous Version:** ${currentVersion}
- **New Version:** ${newVersion}
- **Type:** ${getReleaseTitle(releaseType)}

## 📊 Release Statistics
- **Files Changed:** ${getChangedFilesCount()}
- **Build Size:** ${getBuildSize()}
- **Compatibility:** ${getCompatibilityInfo()}

## 🚀 Deployment Information
- **Environment:** Production
- **Deployment Method:** Docker + Nginx
- **Rollback Plan:** Available (previous version: ${currentVersion})

## ✅ Quality Assurance
- [ ] Functionality Testing
- [ ] Cross-browser Testing
- [ ] Mobile Responsiveness
- [ ] Performance Testing
- [ ] Security Review
- [ ] Accessibility Testing

## 🔧 Technical Changes
${generateTechnicalChanges()}

## 📞 Support
For issues related to this release:
1. Check health endpoint: \`/health\`
2. Review application logs
3. Verify environment configuration
4. Contact development team

---

**Generated on:** ${new Date().toISOString()}  
**Generated by:** 4Calc Release Manager v1.0.0`;

  fs.writeFileSync(`release-notes-v${newVersion}.md`, releaseNotesContent);
}

function getReleaseTitle(type) {
  const titles = {
    patch: 'Patch Release',
    minor: 'Minor Release', 
    major: 'Major Release'
  };
  return titles[type] || 'Release';
}

function generateChangesList() {
  const changes = {
    patch: [
      '- Bug fixes and stability improvements',
      '- Performance optimizations',
      '- Minor UI/UX enhancements',
      '- Documentation updates'
    ],
    minor: [
      '- New calculator features',
      '- Enhanced user interface',
      '- Additional language support',
      '- Improved functionality'
    ],
    major: [
      '- Major feature additions',
      '- Significant UI redesign',
      '- Architecture improvements',
      '- Breaking changes (see migration guide)'
    ]
  };
  
  return changes[releaseType].join('\n');
}

function getChangedFilesCount() {
  try {
    const output = execSync('git diff --name-only HEAD~1', { encoding: 'utf8' });
    return output.split('\n').filter(line => line.trim()).length;
  } catch (e) {
    return 'Unknown';
  }
}

function getBuildSize() {
  try {
    const stats = fs.statSync('index.html');
    return `${(stats.size / 1024).toFixed(2)} KB (main file)`;
  } catch (e) {
    return 'Unknown';
  }
}

function getCompatibilityInfo() {
  return releaseType === 'major' ? 
    'Breaking changes - migration required' : 
    'Fully backwards compatible';
}

function generateTechnicalChanges() {
  const technical = {
    patch: '- Code optimizations\n- Bug fixes\n- Dependency updates',
    minor: '- New feature implementations\n- API enhancements\n- Performance improvements',
    major: '- Architecture changes\n- Major refactoring\n- New technology stack'
  };
  
  return technical[releaseType];
}