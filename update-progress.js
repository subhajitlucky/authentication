#!/usr/bin/env node

/**
 * 🚀 PROJECT PROGRESS TRACKER
 * 
 * This script analyzes your auth-system project and automatically
 * updates completion percentages in README.md and AUTHENTICATION_ROADMAP.md
 * 
 * Usage: node update-progress.js
 */

const fs = require('fs');
const path = require('path');

// Define all features to track
const FEATURES = {
  // Core Backend Features
  backendServer: { file: 'auth-backend/server.js', name: 'Backend Server' },
  userModel: { file: 'auth-backend/models/User.js', name: 'User Database Model' },
  authMiddleware: { file: 'auth-backend/middlewares/authMiddleware.js', name: 'JWT Middleware' },
  
  // Frontend Components
  loginComponent: { file: 'auth-frontend/src/components/Login.jsx', name: 'Login Component' },
  signupComponent: { file: 'auth-frontend/src/components/Signup.jsx', name: 'Signup Component' },
  forgotPasswordComponent: { file: 'auth-frontend/src/components/ForgotPassword.jsx', name: 'Forgot Password' },
  resetPasswordComponent: { file: 'auth-frontend/src/components/ResetPassword.jsx', name: 'Reset Password' },
  navigationComponent: { file: 'auth-frontend/src/components/Navigation.jsx', name: 'Navigation Component' },
  testProtectedComponent: { file: 'auth-frontend/src/components/TestProtected.jsx', name: 'Protected Route Test' },
  
  // Utilities & Configuration
  authUtils: { file: 'auth-frontend/src/utils/auth.js', name: 'Authentication Utilities' },
  apiUtils: { file: 'auth-frontend/src/utils/api.js', name: 'API Configuration' },
  appComponent: { file: 'auth-frontend/src/App.jsx', name: 'Main App Component' },
  
  // Dashboard/Home (Optional)
  homeComponent: { file: 'auth-frontend/src/pages/Home.jsx', name: 'Dashboard/Home Page', optional: true },
  
  // Environment Configuration
  backendEnv: { file: 'auth-backend/.env', name: 'Backend Environment', optional: true },
  frontendEnv: { file: 'auth-frontend/.env', name: 'Frontend Environment', optional: true },
  
  // Package files
  backendPackage: { file: 'auth-backend/package.json', name: 'Backend Dependencies' },
  frontendPackage: { file: 'auth-frontend/package.json', name: 'Frontend Dependencies' },
  
  // Documentation
  readme: { file: 'README.md', name: 'Project Documentation' },
  roadmap: { file: 'AUTHENTICATION_ROADMAP.md', name: 'Development Roadmap' }
};

/**
 * Check if a file exists and has meaningful content
 */
function checkFeature(feature) {
  const filePath = feature.file;
  
  try {
    if (!fs.existsSync(filePath)) {
      return { implemented: false, reason: 'File does not exist' };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if file has meaningful content (more than just comments/empty lines)
    const meaningfulLines = content
      .split('\n')
      .filter(line => line.trim() && !line.trim().startsWith('//') && !line.trim().startsWith('/*'))
      .length;
    
    if (meaningfulLines < 3) {
      return { implemented: false, reason: 'File exists but appears empty' };
    }
    
    return { implemented: true, lines: meaningfulLines };
    
  } catch (error) {
    return { implemented: false, reason: `Error reading file: ${error.message}` };
  }
}

/**
 * Calculate overall project completion percentage
 */
function calculateProgress() {
  const results = {};
  let totalFeatures = 0;
  let implementedFeatures = 0;
  let requiredFeatures = 0;
  let implementedRequired = 0;
  
  console.log('🔍 Analyzing project structure...\n');
  
  for (const [key, feature] of Object.entries(FEATURES)) {
    const result = checkFeature(feature);
    results[key] = { ...feature, ...result };
    
    totalFeatures++;
    if (result.implemented) {
      implementedFeatures++;
    }
    
    // Track required vs optional features
    if (!feature.optional) {
      requiredFeatures++;
      if (result.implemented) {
        implementedRequired++;
      }
    }
    
    const status = result.implemented ? '✅' : (feature.optional ? '🟡' : '❌');
    const optional = feature.optional ? ' (optional)' : '';
    console.log(`${status} ${feature.name}${optional}`);
    if (!result.implemented && result.reason) {
      console.log(`   └─ ${result.reason}`);
    }
  }
  
  const overallPercentage = Math.round((implementedFeatures / totalFeatures) * 100);
  const requiredPercentage = Math.round((implementedRequired / requiredFeatures) * 100);
  
  console.log('\n📊 PROGRESS SUMMARY:');
  console.log(`Overall Completion: ${implementedFeatures}/${totalFeatures} features (${overallPercentage}%)`);
  console.log(`Required Features: ${implementedRequired}/${requiredFeatures} features (${requiredPercentage}%)`);
  
  return {
    overall: overallPercentage,
    required: requiredPercentage,
    implemented: implementedFeatures,
    total: totalFeatures,
    results
  };
}

/**
 * Update README.md with new progress
 */
function updateReadme(progress) {
  const readmePath = 'README.md';
  if (!fs.existsSync(readmePath)) {
    console.log('❌ README.md not found');
    return;
  }
  
  let content = fs.readFileSync(readmePath, 'utf-8');
  
  // Update progress badge
  const badgeRegex = /!\[Progress\]\(https:\/\/img\.shields\.io\/badge\/Project%20Progress-\d+%25-\w+\?style=for-the-badge&logo=github\)/;
  const color = progress.overall >= 80 ? 'brightgreen' : progress.overall >= 60 ? 'orange' : progress.overall >= 40 ? 'yellow' : 'red';
  const newBadge = `![Progress](https://img.shields.io/badge/Project%20Progress-${progress.overall}%25-${color}?style=for-the-badge&logo=github)`;
  
  content = content.replace(badgeRegex, newBadge);
  
  fs.writeFileSync(readmePath, content);
  console.log(`✅ Updated README.md with ${progress.overall}% completion`);
}

/**
 * Update AUTHENTICATION_ROADMAP.md with new progress
 */
function updateRoadmap(progress) {
  const roadmapPath = 'AUTHENTICATION_ROADMAP.md';
  if (!fs.existsSync(roadmapPath)) {
    console.log('❌ AUTHENTICATION_ROADMAP.md not found');
    return;
  }
  
  let content = fs.readFileSync(roadmapPath, 'utf-8');
  
  // Update overall progress badge
  const badgeRegex = /!\[Overall Progress\]\(https:\/\/img\.shields\.io\/badge\/Overall%20Progress-\d+%25-\w+\?style=for-the-badge&logo=rocket\)/;
  const color = progress.overall >= 80 ? 'brightgreen' : progress.overall >= 60 ? 'orange' : progress.overall >= 40 ? 'yellow' : 'red';
  const newBadge = `![Overall Progress](https://img.shields.io/badge/Overall%20Progress-${progress.overall}%25-${color}?style=for-the-badge&logo=rocket)`;
  
  content = content.replace(badgeRegex, newBadge);
  
  fs.writeFileSync(roadmapPath, content);
  console.log(`✅ Updated AUTHENTICATION_ROADMAP.md with ${progress.overall}% completion`);
}

/**
 * Generate a detailed report
 */
function generateReport(progress) {
  const report = `
🚀 PROJECT PROGRESS REPORT
Generated: ${new Date().toISOString()}

📊 COMPLETION STATISTICS:
- Overall Progress: ${progress.overall}%
- Features Implemented: ${progress.implemented}/${progress.total}
- Project Status: ${progress.overall >= 80 ? 'Nearly Complete' : progress.overall >= 60 ? 'Good Progress' : progress.overall >= 40 ? 'In Progress' : 'Getting Started'}

✅ IMPLEMENTED FEATURES:
${Object.values(progress.results)
  .filter(f => f.implemented)
  .map(f => `- ${f.name}`)
  .join('\n')}

⏳ PENDING FEATURES:
${Object.values(progress.results)
  .filter(f => !f.implemented && !f.optional)
  .map(f => `- ${f.name}`)
  .join('\n')}

🟡 OPTIONAL FEATURES:
${Object.values(progress.results)
  .filter(f => !f.implemented && f.optional)
  .map(f => `- ${f.name}`)
  .join('\n')}

🎯 NEXT STEPS:
${progress.overall >= 80 ? 
  '- Focus on production deployment\n- Add comprehensive testing\n- Implement advanced security features' : 
  progress.overall >= 60 ? 
  '- Complete remaining core features\n- Add input validation\n- Implement rate limiting' :
  '- Complete basic authentication flow\n- Set up environment configuration\n- Test all components'
}
`;
  
  fs.writeFileSync('progress-report.txt', report);
  console.log('📄 Generated detailed report: progress-report.txt');
}

// Main execution
if (require.main === module) {
  console.log('🚀 Starting Project Progress Analysis...\n');
  
  const progress = calculateProgress();
  
  console.log('\n📝 Updating documentation...');
  updateReadme(progress);
  updateRoadmap(progress);
  generateReport(progress);
  
  console.log('\n🎉 Progress analysis complete!');
  console.log(`Your auth-system project is ${progress.overall}% complete!`);
  
  if (progress.overall >= 80) {
    console.log('🎊 Congratulations! Your project is nearly complete!');
  } else if (progress.overall >= 60) {
    console.log('👍 Great progress! Keep up the good work!');
  } else {
    console.log('💪 Keep coding! You\'re building something awesome!');
  }
}

module.exports = { calculateProgress, updateReadme, updateRoadmap }; 