const { exec } = require('child_process');

console.log('Starting comprehensive animated icons extraction...');

exec('node tmp/extract-comprehensive-animated-icons.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
  
  // Now copy the generated file to the proper location
  const fs = require('fs');
  try {
    const generatedContent = fs.readFileSync('./tmp/comprehensive-animated-icons.ts', 'utf8');
    fs.writeFileSync('./src/data/animated-icons.ts', generatedContent);
    console.log('\n✅ Successfully updated src/data/animated-icons.ts with comprehensive animated icons!');
  } catch (copyError) {
    console.error('Error copying file:', copyError);
  }
});