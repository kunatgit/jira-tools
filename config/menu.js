export const menuGroups = [
  {
    group: 'เมนูหลัก',
    roles: ['Admin', 'User'],
    items: [
      {
        key: 'home',
        label: 'หน้าแรก',
        icon: '🏠',
        description: 'หน้าแรกของระบบ',
        path: '/home',
        color: '#a5b4fc',
      },
      {
        key: 'add-worklogs',
        label: 'เพิ่ม Worklogs',
        icon: '📝',
        description: 'เพิ่มข้อมูล Worklogs รายวัน',
        path: '/add-worklogs',
        color: '#a78bfa',
      },
      {
        key: 'check-worklogs',
        label: 'ตรวจสอบ Worklogs',
        icon: '🔎',
        description: 'ตรวจสอบ Worklogs รายบุคคล',
        path: '/check-worklogs',
        color: '#93c5fd',
      },
      {
        key: 'report-worklogs',
        label: 'รายงาน Worklogs ทั้งทีม',
        icon: '📊',
        description: 'รายงานการกรอก Worklogs ของทีม',
        path: '/report-worklogs',
        color: '#6ee7b7',
      },
    ],
  },
  {
    group: 'ระบบ',
    roles: ['Admin'],
    items: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        icon: '🖥️',
        description: 'หน้าสรุปภาพรวมของระบบ',
        path: '/dashboard',
        color: '#fde68a',
      },
      {
        key: 'manage-users',
        label: 'จัดการผู้ใช้งาน',
        icon: '👤',
        description: 'จัดการข้อมูลผู้ใช้งานในระบบ',
        path: '/manage-users',
        color: '#f9a8d4',
      },
      {
        key: 'manage-role-users',
        label: 'จัดการสิทธิ์ผู้ใช้งาน',
        icon: '🛡️',
        description: 'จัดการ Role และสิทธิ์การเข้าถึงของผู้ใช้งาน',
        path: '/manage-role-users',
        color: '#fdba74',
      },
    ],
  },
];

export function getMenuForRole(role) {
  return menuGroups
    .filter((group) => group.roles.includes(role))
    .map((group) => ({
      ...group,
      items: group.items,
    }));
}
