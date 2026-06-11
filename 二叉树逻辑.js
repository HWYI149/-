/**
 * ==========================================
 * 二叉树可视化分析器 - 核心逻辑
 * ==========================================
 */

// ===== 二叉树节点类 =====
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// ===== 全局状态 =====
let root = null;

// ===== 1. 二叉树的创建 =====
/**
 * 从层序数组构建二叉树（null 表示空节点）
 * 例如: [8, 4, 12, 2, 6, 10, 14, null, null, 5, 7]
 */
function buildTreeFromLevelOrder(arr) {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === 'null') return null;

  const root = new TreeNode(parseValue(arr[0]));
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();

    // 左子节点
    if (i < arr.length && arr[i] !== null && arr[i] !== 'null') {
      node.left = new TreeNode(parseValue(arr[i]));
      queue.push(node.left);
    }
    i++;

    // 右子节点
    if (i < arr.length && arr[i] !== null && arr[i] !== 'null') {
      node.right = new TreeNode(parseValue(arr[i]));
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

function parseValue(v) {
  if (v === null || v === 'null') return null;
  const n = Number(v);
  return isNaN(n) ? v : n;
}

// ===== 2. 二叉树的基本遍历 =====

// 前序遍历 - 递归
function preorderRecursive(node, result = []) {
  if (!node) return result;
  result.push(node.val);
  preorderRecursive(node.left, result);
  preorderRecursive(node.right, result);
  return result;
}

// 前序遍历 - 非递归
function preorderIterative(node) {
  if (!node) return [];
  const result = [];
  const stack = [node];
  while (stack.length > 0) {
    const curr = stack.pop();
    result.push(curr.val);
    if (curr.right) stack.push(curr.right);
    if (curr.left) stack.push(curr.left);
  }
  return result;
}

// 中序遍历 - 递归
function inorderRecursive(node, result = []) {
  if (!node) return result;
  inorderRecursive(node.left, result);
  result.push(node.val);
  inorderRecursive(node.right, result);
  return result;
}

// 中序遍历 - 非递归
function inorderIterative(node) {
  if (!node) return [];
  const result = [];
  const stack = [];
  let curr = node;
  while (curr || stack.length > 0) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }
  return result;
}

// 后序遍历 - 递归
function postorderRecursive(node, result = []) {
  if (!node) return result;
  postorderRecursive(node.left, result);
  postorderRecursive(node.right, result);
  result.push(node.val);
  return result;
}

// 后序遍历 - 非递归
function postorderIterative(node) {
  if (!node) return [];
  const result = [];
  const stack = [node];
  const output = [];
  while (stack.length > 0) {
    const curr = stack.pop();
    output.push(curr.val);
    if (curr.left) stack.push(curr.left);
    if (curr.right) stack.push(curr.right);
  }
  return output.reverse();
}

// 层序遍历
function levelOrder(node) {
  if (!node) return [];
  const result = [];
  const queue = [node];
  while (queue.length > 0) {
    const curr = queue.shift();
    result.push(curr.val);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }
  return result;
}

// ===== 3. 二叉树的结构分析 =====

// 节点总数
function countNodes(node) {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}

// 叶子节点数量
function countLeaves(node) {
  if (!node) return 0;
  if (!node.left && !node.right) return 1;
  return countLeaves(node.left) + countLeaves(node.right);
}

// 树的高度
function getHeight(node) {
  if (!node) return 0;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

// 每一层的节点数量
function getNodesPerLevel(node) {
  if (!node) return [];
  const result = [];
  let queue = [node];
  while (queue.length > 0) {
    result.push(queue.length);
    const next = [];
    for (const n of queue) {
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    queue = next;
  }
  return result;
}

// 最宽的一层宽度
function getMaxWidth(node) {
  if (!node) return 0;
  let maxWidth = 0;
  let queue = [node];
  while (queue.length > 0) {
    maxWidth = Math.max(maxWidth, queue.length);
    const next = [];
    for (const n of queue) {
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    queue = next;
  }
  return maxWidth;
}

// ===== 4. 二叉树性质判断 =====

// 是否为空树
function isEmpty(node) {
  return node === null;
}

// 是否为满二叉树
function isFullTree(node) {
  if (!node) return true;
  if (!node.left && !node.right) return true;
  if (node.left && node.right) {
    return isFullTree(node.left) && isFullTree(node.right);
  }
  return false;
}

// 是否为完全二叉树
function isCompleteTree(node) {
  if (!node) return true;
  const queue = [node];
  let encounteredNull = false;
  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr) {
      encounteredNull = true;
    } else {
      if (encounteredNull) return false;
      queue.push(curr.left);
      queue.push(curr.right);
    }
  }
  return true;
}

// 是否为平衡二叉树
function isBalancedTree(node) {
  function checkHeight(n) {
    if (!n) return 0;
    const leftH = checkHeight(n.left);
    if (leftH === -1) return -1;
    const rightH = checkHeight(n.right);
    if (rightH === -1) return -1;
    if (Math.abs(leftH - rightH) > 1) return -1;
    return 1 + Math.max(leftH, rightH);
  }
  return checkHeight(node) !== -1;
}

// 是否为二叉搜索树
function isBST(node) {
  function validate(n, min, max) {
    if (!n) return true;
    if (n.val <= min || n.val >= max) return false;
    return validate(n.left, min, n.val) && validate(n.right, n.val, max);
  }
  return validate(node, -Infinity, Infinity);
}

// ===== 5. 路径相关功能 =====

// 查找值是否存在
function findValue(node, target) {
  if (!node) return false;
  if (node.val == target) return true;
  return findValue(node.left, target) || findValue(node.right, target);
}

// 从根节点到目标节点的路径
function findPath(node, target) {
  const path = [];
  function dfs(n, target) {
    if (!n) return false;
    path.push(n.val);
    if (n.val == target) return true;
    if (dfs(n.left, target) || dfs(n.right, target)) return true;
    path.pop();
    return false;
  }
  if (dfs(node, target)) return path;
  return null;
}

// 目标节点所在的层数
function findLevel(node, target, level = 1) {
  if (!node) return -1;
  if (node.val == target) return level;
  const left = findLevel(node.left, target, level + 1);
  if (left !== -1) return left;
  return findLevel(node.right, target, level + 1);
}

// ===== 6. 树形文本可视化 =====

function treeToText(node) {
  if (!node) return '(空树)';

  const height = getHeight(node);
  const maxWidth = Math.pow(2, height) * 4;

  // 使用坐标映射构建输出
  const matrix = [];
  for (let i = 0; i < height * 2 - 1; i++) {
    matrix.push(new Array(maxWidth).fill(' '));
  }

  function place(n, row, col, span) {
    if (!n) return;
    const s = String(n.val);
    const start = col - Math.floor(s.length / 2);
    for (let i = 0; i < s.length; i++) {
      if (start + i >= 0 && start + i < maxWidth) {
        matrix[row * 2][start + i] = s[i];
      }
    }

    if (n.left) {
      const leftCol = Math.floor(col - span / 2);
      // 在节点和左子节点之间画斜线
      const midRow = row * 2 + 1;
      const step = (col - leftCol) / 3;
      for (let k = 1; k <= 3; k++) {
        const x = Math.floor(col - step * k);
        if (x >= 0 && x < maxWidth) {
          matrix[midRow][x] = '/';
        }
      }
      place(n.left, row + 1, leftCol, span / 2);
    }

    if (n.right) {
      const rightCol = Math.floor(col + span / 2);
      // 在节点和右子节点之间画斜线
      const midRow = row * 2 + 1;
      const step = (rightCol - col) / 3;
      for (let k = 1; k <= 3; k++) {
        const x = Math.floor(col + step * k);
        if (x >= 0 && x < maxWidth) {
          matrix[midRow][x] = '\\';
        }
      }
      place(n.right, row + 1, rightCol, span / 2);
    }
  }

  place(node, 0, Math.floor(maxWidth / 2), Math.floor(maxWidth / 2));

  return matrix.map(line => line.join('').replace(/\s+$/g, '')).join('\n');
}

// ===== Canvas 可视化 =====

function drawTreeOnCanvas(canvasId, node) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // 设置 canvas 尺寸
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  if (!node) {
    ctx.fillStyle = '#999';
    ctx.font = '16px Microsoft YaHei';
    ctx.textAlign = 'center';
    ctx.fillText('请先创建二叉树', W / 2, H / 2);
    return;
  }

  const height = getHeight(node);
  const nodeRadius = Math.max(16, Math.min(24, W / (Math.pow(2, height) + 2)));
  const levelHeight = Math.min(60, (H - 60) / height);

  // 计算每个节点的位置
  const positions = new Map();

  function calcPositions(n, level, index, totalAtLevel) {
    if (!n) return;
    const x = (W / (totalAtLevel + 1)) * (index + 1);
    const y = 40 + level * levelHeight;
    positions.set(n, { x, y });

    // 计算左右子节点在下一层的索引
    let leftIndex = index * 2;
    let rightIndex = index * 2 + 1;
    calcPositions(n.left, level + 1, leftIndex, totalAtLevel * 2);
    calcPositions(n.right, level + 1, rightIndex, totalAtLevel * 2);
  }

  calcPositions(node, 0, 0, 1);

  // 绘制边
  function drawEdges(n) {
    if (!n) return;
    const pos = positions.get(n);
    if (n.left) {
      const leftPos = positions.get(n.left);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y + nodeRadius);
      ctx.lineTo(leftPos.x, leftPos.y - nodeRadius);
      ctx.strokeStyle = '#7f8c8d';
      ctx.lineWidth = 2;
      ctx.stroke();
      drawEdges(n.left);
    }
    if (n.right) {
      const rightPos = positions.get(n.right);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y + nodeRadius);
      ctx.lineTo(rightPos.x, rightPos.y - nodeRadius);
      ctx.strokeStyle = '#7f8c8d';
      ctx.lineWidth = 2;
      ctx.stroke();
      drawEdges(n.right);
    }
  }

  drawEdges(node);

  // 绘制节点
  function drawNodes(n) {
    if (!n) return;
    const pos = positions.get(n);

    // 节点圆
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#3498db';
    ctx.fill();
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 节点文字
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.max(12, nodeRadius * 0.6)}px Microsoft YaHei`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(n.val), pos.x, pos.y);

    drawNodes(n.left);
    drawNodes(n.right);
  }

  drawNodes(node);
}

// ===== 主控制函数 =====

function createTree() {
  const input = document.getElementById('treeInput').value.trim();
  if (!input) {
    alert('请输入二叉树数据');
    return;
  }

  // 解析输入: 支持 [1,2,3] 或 1,2,3 或 1 2 3 格式
  let arr;
  try {
    if (input.startsWith('[')) {
      arr = JSON.parse(input.replace(/'/g, '"'));
    } else {
      arr = input.split(/[,，\s]+/).map(s => {
        s = s.trim();
        if (s === 'null' || s === 'NULL' || s === 'Null') return null;
        const n = Number(s);
        return isNaN(n) ? s : n;
      });
    }
  } catch (e) {
    alert('输入格式错误，请检查');
    return;
  }

  root = buildTreeFromLevelOrder(arr);
  refreshAll();
}

function refreshAll() {
  if (!root) return;

  // 遍历结果
  document.getElementById('preorder').textContent = preorderRecursive(root).join(' ');
  document.getElementById('inorder').textContent = inorderRecursive(root).join(' ');
  document.getElementById('postorder').textContent = postorderRecursive(root).join(' ');
  document.getElementById('levelorder').textContent = levelOrder(root).join(' ');

  // 非递归遍历
  document.getElementById('preorderNonRec').textContent = preorderIterative(root).join(' ');
  document.getElementById('inorderNonRec').textContent = inorderIterative(root).join(' ');
  document.getElementById('postorderNonRec').textContent = postorderIterative(root).join(' ');

  // 结构分析
  document.getElementById('nodeCount').textContent = countNodes(root);
  document.getElementById('leafCount').textContent = countLeaves(root);
  document.getElementById('treeHeight').textContent = getHeight(root);
  document.getElementById('nodesPerLevel').textContent = JSON.stringify(getNodesPerLevel(root));
  document.getElementById('maxWidth').textContent = getMaxWidth(root);

  // 性质判断
  document.getElementById('isEmpty').textContent = isEmpty(root) ? '是' : '否';
  document.getElementById('isEmpty').className = 'value ' + (isEmpty(root) ? 'true' : 'false');

  document.getElementById('isFull').textContent = isFullTree(root) ? '是' : '否';
  document.getElementById('isFull').className = 'value ' + (isFullTree(root) ? 'true' : 'false');

  document.getElementById('isComplete').textContent = isCompleteTree(root) ? '是' : '否';
  document.getElementById('isComplete').className = 'value ' + (isCompleteTree(root) ? 'true' : 'false');

  document.getElementById('isBalanced').textContent = isBalancedTree(root) ? '是' : '否';
  document.getElementById('isBalanced').className = 'value ' + (isBalancedTree(root) ? 'true' : 'false');

  document.getElementById('isBST').textContent = isBST(root) ? '是' : '否';
  document.getElementById('isBST').className = 'value ' + (isBST(root) ? 'true' : 'false');

  // 文本可视化
  document.getElementById('textVisual').textContent = treeToText(root);

  // Canvas 可视化
  drawTreeOnCanvas('treeCanvas', root);
}

function searchValue() {
  const target = document.getElementById('searchValue').value.trim();
  if (target === '') {
    alert('请输入要查找的值');
    return;
  }
  const parsedTarget = isNaN(Number(target)) ? target : Number(target);

  const container = document.getElementById('searchResult');

  if (!root) {
    container.innerHTML = '<div class="path-result error"><div class="label">结果</div><div class="value">树为空</div></div>';
    return;
  }

  const found = findValue(root, parsedTarget);
  if (!found) {
    container.innerHTML = `<div class="path-result error"><div class="label">结果</div><div class="value">值 "${parsedTarget}" 不存在于树中</div></div>`;
    return;
  }

  const path = findPath(root, parsedTarget);
  const level = findLevel(root, parsedTarget);

  container.innerHTML = `
    <div class="path-result">
      <div class="label">查找结果</div>
      <div class="value">值 "${parsedTarget}" 存在于树中 ✓</div>
    </div>
    <div class="path-result">
      <div class="label">从根节点到该节点的路径</div>
      <div class="value">${path.join(' → ')}</div>
    </div>
    <div class="path-result">
      <div class="label">该节点所在的层数</div>
      <div class="value">第 ${level} 层</div>
    </div>
  `;
}

function clearTree() {
  root = null;
  document.getElementById('treeInput').value = '';
  document.getElementById('preorder').textContent = '-';
  document.getElementById('inorder').textContent = '-';
  document.getElementById('postorder').textContent = '-';
  document.getElementById('levelorder').textContent = '-';
  document.getElementById('preorderNonRec').textContent = '-';
  document.getElementById('inorderNonRec').textContent = '-';
  document.getElementById('postorderNonRec').textContent = '-';
  document.getElementById('nodeCount').textContent = '-';
  document.getElementById('leafCount').textContent = '-';
  document.getElementById('treeHeight').textContent = '-';
  document.getElementById('nodesPerLevel').textContent = '-';
  document.getElementById('maxWidth').textContent = '-';
  document.getElementById('isEmpty').textContent = '-';
  document.getElementById('isEmpty').className = 'value';
  document.getElementById('isFull').textContent = '-';
  document.getElementById('isFull').className = 'value';
  document.getElementById('isComplete').textContent = '-';
  document.getElementById('isComplete').className = 'value';
  document.getElementById('isBalanced').textContent = '-';
  document.getElementById('isBalanced').className = 'value';
  document.getElementById('isBST').textContent = '-';
  document.getElementById('isBST').className = 'value';
  document.getElementById('textVisual').textContent = '(空树)';
  document.getElementById('searchResult').innerHTML = '';
  document.getElementById('searchValue').value = '';

  const canvas = document.getElementById('treeCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#999';
  ctx.font = '16px Microsoft YaHei';
  ctx.textAlign = 'center';
  ctx.fillText('请先创建二叉树', canvas.width / 2, canvas.height / 2);
}

function usePreset(preset) {
  document.getElementById('treeInput').value = preset;
  createTree();
}

// ===== 初始化 =====
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('treeCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#999';
    ctx.font = '16px Microsoft YaHei';
    ctx.textAlign = 'center';
    ctx.fillText('请先创建二叉树', canvas.width / 2, canvas.height / 2);
  }

  // 回车键触发
  document.getElementById('treeInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') createTree();
  });
  document.getElementById('searchValue').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchValue();
  });
});

window.addEventListener('resize', () => {
  if (root) drawTreeOnCanvas('treeCanvas', root);
});
