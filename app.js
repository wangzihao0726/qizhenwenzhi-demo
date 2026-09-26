(() => {
  const views = ['student', 'teacher', 'progress'];
  function showView() {
    const name = location.hash.slice(1), active = views.includes(name) ? name : 'student';
    views.forEach(id => { document.getElementById(id).hidden = id !== active; });
    document.querySelectorAll('[data-view]').forEach(link => { if (link.dataset.view === active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
  }
  window.addEventListener('hashchange', showView); showView();
  document.querySelectorAll('[data-report]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-report]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const price = button.dataset.report === 'price';
    document.getElementById('strict-periods').textContent = price ? '48 / 180' : '47 / 180';
    document.getElementById('report-caption').textContent = (price ? '价格反转' : '相对成交量') + '：20日信号窗口。完整严格净值为 null，不能由局部结果证明策略有效。';
  }));
  document.getElementById('teacher-filter').addEventListener('change', event => {
    let count = 0;
    document.querySelectorAll('[data-state]').forEach(row => { row.hidden = event.target.value !== 'all' && row.dataset.state !== event.target.value; if (!row.hidden) count++; });
    document.getElementById('filter-status').textContent = `显示${count}条演示记录。提交次数与提示等级不等同于知识掌握程度。`;
  });
  const dialog = document.getElementById('image-dialog'), image = document.getElementById('dialog-image'); let opener;
  document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
    opener = button; image.src = button.dataset.image; image.alt = button.dataset.caption; document.getElementById('image-caption').textContent = button.dataset.caption; dialog.showModal();
  }));
  const close = () => { dialog.close(); image.removeAttribute('src'); opener?.focus(); };
  document.getElementById('close-image').addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
})();