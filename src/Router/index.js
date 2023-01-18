import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/employees",
        name: "employees",
        component: () => import("../views/employees/Index.vue"),
      },
      {
        path: "/employees/:id",
        name: "employees.show",
        component: () => import("../views/employees/Show.vue"),
      },
      {
        path: "/company",
        name: "company",
        component: () => import("../views/company/Index.vue"),
      },
      {
        path: "/posisition",
        name: "posisition",
        component: () => import("../views/posisition/Index.vue"),
      },
      {
        path: "/division",
        name: "division",
        component: () => import("../views/division/Index.vue"),
      },
      {
        path: "/allowancetype",
        name: "allowancetype",
        component: () => import("../views/allowancetype/Index.vue"),
      },

      {
        path: "/furloughtype",
        name: "furloughtype",
        component: () => import("../views/furloughtype/Index.vue"),
      },
      {
        path: "/salary",
        name: "salary",
        component: () => import("../views/salary/Index.vue"),
      },
      {
        path: "/salary/:id",
        name: "salary.show",
        component: () => import("../views/salary/Show.vue"),
      },
      {
        path: "/daily-salary",
        name: "daily-salary",
        component: () => import("../views/reportsalary/DailySalary.vue"),
      },
      {
        path: "/daily-salary/:id",
        name: "daily-salary.show",
        component: () => import("../views/reportsalary/DailyShow.vue"),
      },
      {
        path: "/contract-salary",
        name: "contract-salary",
        component: () => import("../views/reportsalary/ContractSalary.vue"),
      },
      {
        path: "/contract-salary/:id",
        name: "contract-salary.show",
        component: () => import("../views/reportsalary/ContractShow.vue"),
      },
      {
        path: "/furlough",
        name: "furlough",
        component: () => import("../views/furlough/Index.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
