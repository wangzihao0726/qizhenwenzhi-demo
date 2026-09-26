/* Entry-only code. Current ephemeral address lives in a separately published manifest. */
(async () => {
  const status = document.querySelector('#entry-status');
  try {
    const response = await fetch('live-origin.json?t=' + Date.now(), {cache: 'no-store', credentials: 'omit'});
    if (!response.ok) throw new Error('manifest');
    const state = await response.json();
    const target = new URL(state.origin);
    if (target.protocol !== 'https:' || !/^[a-z0-9-]+\.trycloudflare\.com$/.test(target.hostname) || target.username || target.password || target.port || target.pathname !== '/' || target.search || target.hash) throw new Error('origin');
    const checked = Date.parse(state.checked_at);
    const age = Date.now() - checked;
    if (!Number.isFinite(checked) || age < -300000 || state.check_result !== 'reachable') throw new Error('unchecked');
    const link = document.querySelector('#live-login');
    link.href = target.origin + '/login'; link.hidden = false;
    document.querySelector('#entry-checked').textContent = '最近人工/脚本检查：' + new Date(checked).toLocaleString('zh-CN') + '。隧道地址可能随重建变化。';
    if (age > 86400000) { status.textContent = '入口检查已超过 24 小时，暂停自动跳转。请先向教师确认，或手动尝试登录。'; return; }
    status.textContent = '已读取最近核验的临时入口，即将打开登录页。若失败，请联系教师更新入口。';
    setTimeout(() => location.assign(link.href), 1000);
  } catch {
    status.textContent = '暂时无法确认教学入口。请联系教师检查隧道并重新发布地址；本页不会跳转到未经核验的地址。';
  }
})();
