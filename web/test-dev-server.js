// 简单的测试脚本来验证开发服务器是否能正常启动
const { spawn } = require('child_process');

console.log('🚀 启动开发服务器测试...');

const devProcess = spawn('pnpm', ['dev'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

let hasStarted = false;
let output = '';

// 监听stdout
devProcess.stdout.on('data', (data) => {
  const text = data.toString();
  output += text;
  console.log('📤 输出:', text.trim());
  
  if (text.includes('Local:') || text.includes('ready in') || text.includes('localhost')) {
    console.log('✅ 开发服务器启动成功！');
    hasStarted = true;
    devProcess.kill();
  }
});

// 监听stderr
devProcess.stderr.on('data', (data) => {
  const text = data.toString();
  console.log('❌ 错误:', text.trim());
  if (text.includes('Error') || text.includes('error')) {
    console.log('💥 启动失败');
    devProcess.kill();
  }
});

// 设置超时
setTimeout(() => {
  if (!hasStarted) {
    console.log('⏰ 超时 - 可能需要更长时间启动，或者存在问题');
    console.log('📝 最后的输出:');
    console.log(output);
    devProcess.kill();
  }
}, 30000);

devProcess.on('close', (code) => {
  console.log(`🏁 进程结束，退出代码: ${code}`);
  if (hasStarted) {
    console.log('🎉 测试完成：开发服务器可以正常启动！');
  }
  process.exit(0);
});