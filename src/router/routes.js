const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'signup', component: () => import('pages/SignupPage.vue') },

    ]
  },
  {
    path: '/student',
    component: () => import('layouts/StudentLayout.vue'),
    children: [
      { path: '/student-dashboard', component: () => import('src/pages/student/StudentDashboard.vue'),
        meta: { requiresAuth: true }},
      { path: '/claim-request/:id', component: () => import('src/pages/ClaimRequest.vue'),
        meta: { requiresAuth: true}},
      { path: '/student-ranking', component: () => import('src/pages/student/TopStudent.vue'),
        meta: { requiresAuth: true }},
      { path: '/student-forum', component: () => import('src/pages/student/StudentForum.vue')},
      { path: '/category/:id', name: 'category', component: () => import('src/pages/CategoryPage.vue')},
      { path: '/thread/:id', name: 'thread', component: () => import('src/pages/ThreadPage.vue')}, 
      { path: '/student-profile', component: () => import('src/pages/student/StudentProfile.vue'),
        meta: { requiresAuth: true}},

      { path: '/student-history', component: () => import('src/pages/student/StudentHistory.vue')},
      { path: '/post-lost-found', component: () => import('src/components/PostLostFound.vue')},
      { path: '/student-sample', component: () => import('src/pages/student/StudentSample.vue')},
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/admin-dashboard', component: () => import('src/pages/admin/AdminDashboard.vue') },
      { path: '/admin-student-list', component: () => import('src/pages/admin/StudentList.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
