import type { Metadata } from "next";
import { DepartmentCard } from "@/components/dashboard/DepartmentCard";
import { AdminActionButton } from "@/components/dashboard/AdminActionButton";
import { mockDepartments } from "@/config/adminMockData";

export const metadata: Metadata = { title: "Departments — Admin" };

export default function AdminDepartmentsPage() {
  const totalHeadcount = mockDepartments.reduce((sum, dept) => sum + dept.headcount, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-h3 text-foreground">Departments</h1>
          <p className="text-body-sm text-muted-foreground">
            {mockDepartments.length} departments &middot; {totalHeadcount} employees.
          </p>
        </div>
        <AdminActionButton label="Add Department" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockDepartments.map((department) => <DepartmentCard key={department.id} department={department} />)}
      </div>
    </div>
  );
}
