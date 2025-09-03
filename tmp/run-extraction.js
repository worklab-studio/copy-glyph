const { execSync } = require('child_process');

try {
  console.log('Running icon extraction...');
  const output = execSync('node tmp/extract-animated-icons-comprehensive.js', { encoding: 'utf8' });
  console.log(output);
} catch (error) {
  console.error('Error running extraction:', error.message);
}