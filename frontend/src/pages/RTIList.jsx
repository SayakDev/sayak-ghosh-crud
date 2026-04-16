import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { fetchRTIs, deleteRTI } from "@/services/api/rtis";

const DEPARTMENTS = ["Manager", "Supervisor", "Accountant"];
const STATUSES = ["Verified", "Pending", "Save Draft", "Rejected"];

const statusClass = (status) => {
  switch (status) {
    case "Verified":
      return "text-emerald-600 font-semibold";
    case "Pending":
      return "text-amber-500 font-semibold";
    case "Save Draft":
      return "text-blue-600 font-semibold";
    case "Rejected":
      return "text-red-600 font-semibold";
    default:
      return "text-foreground";
  }
};

// ---------- Filter dropdown ----------
const FilterDropdown = ({ label, options, value, onChange }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="inline-flex items-center justify-between gap-2 h-9 px-3 min-w-[120px] rounded-md border border-input bg-card text-sm text-foreground hover:bg-secondary transition">
      <span className={value ? "font-medium" : ""}>
        {value || label}
      </span>
      <ChevronDown className="w-4 h-4 text-muted-foreground" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="min-w-[160px]">
      <DropdownMenuItem onClick={() => onChange("")}>
        <div className="flex items-center justify-between w-full">
          <span>All</span>
          {!value && <Check className="w-4 h-4" />}
        </div>
      </DropdownMenuItem>
      {options.map((opt) => (
        <DropdownMenuItem key={opt} onClick={() => onChange(opt)}>
          <div className="flex items-center justify-between w-full">
            <span>{opt}</span>
            {value === opt && <Check className="w-4 h-4" />}
          </div>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

// ---------- Pagination ----------
const getPageNumbers = (current, total) => {
  // Always show: 1, 2, 3, ..., last  with the current page highlighted somewhere
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, 2, 3, current, total]);
  // Ensure the current page neighbors render nicely
  if (current > 4) pages.add(current);
  const sorted = Array.from(pages).filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const out = [];
  for (let i = 0; i < sorted.length; i++) {
    out.push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
      out.push("…");
    }
  }
  return out;
};

const RTIList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateSort, setDateSort] = useState(""); // "" | "Newest" | "Oldest"
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteRTI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rtis"] });
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    },
  });

  const { data: fetchedRTIs = [] } = useQuery({
    queryKey: ["rtis"],
    queryFn: fetchRTIs,
    staleTime: 300000,
    cacheTime: 600000,
  });

  const departmentOptions = useMemo(() => {
    const departments = Array.from(new Set(fetchedRTIs.map((item) => item.department).filter(Boolean)));
    return departments.length ? departments : DEPARTMENTS;
  }, [fetchedRTIs]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "rtiNo",
        header: "RTI No.",
        cell: (info) => <span className="text-muted-foreground">{info.getValue()}</span>,
      },
      {
        accessorKey: "applicant",
        header: "Applicant",
        cell: (info) => <span className="text-foreground">{info.getValue()}</span>,
      },
      {
        accessorKey: "department",
        header: "Department",
        filterFn: "equals",
        cell: (info) => <span className="text-muted-foreground">{info.getValue()}</span>,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => <span className="text-muted-foreground">{info.getValue()}</span>,
        sortingFn: (a, b, columnId) => {
          const parse = (s) => {
            const [year, month, day] = s.split("-").map(Number);
            return new Date(year, month - 1, day).getTime();
          };
          return parse(a.getValue(columnId)) - parse(b.getValue(columnId));
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        filterFn: "equals",
        cell: (info) => <span className={statusClass(info.getValue())}>{info.getValue()}</span>,
      },
      {
        id: "actions",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/rti-management/${row.original.id}`)}
              className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-input hover:bg-secondary transition"
              aria-label="View"
            >
              <Eye className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => navigate(`/rti-management/${row.original.id}/edit`)}
              className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-input hover:bg-secondary transition"
              aria-label="Edit"
            >
              <Pencil className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              onClick={() => {
                setDeleteTarget(row.original);
                setDeleteDialogOpen(true);
              }}
              disabled={deleteMutation.isLoading}
              className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-input hover:bg-secondary transition disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  const columnFilters = useMemo(() => {
    const cf = [];
    if (departmentFilter) cf.push({ id: "department", value: departmentFilter });
    if (statusFilter) cf.push({ id: "status", value: statusFilter });
    return cf;
  }, [departmentFilter, statusFilter]);

  const sorting = useMemo(() => {
    if (dateSort === "Newest") return [{ id: "date", desc: true }];
    if (dateSort === "Oldest") return [{ id: "date", desc: false }];
    return [];
  }, [dateSort]);

  const table = useReactTable({
    data: fetchedRTIs,
    columns,
    state: { globalFilter, columnFilters, sorting },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount() || 1;
  const pageNumbers = getPageNumbers(pageIndex + 1, pageCount);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header
          title="RTI Management"
          subtitle="RTI Management"
          searchValue={globalFilter}
          onSearchChange={setGlobalFilter}
        />
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex justify-end mb-4">
            <Link
              to="/rti-management/new"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-brand text-brand-foreground text-sm font-medium hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              RTI Registration
            </Link>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-wrap gap-3">
              <h2 className="text-base font-bold text-foreground">
                {totalRows.toLocaleString()} RTI
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <FilterDropdown
                  label="Date"
                  options={["Newest", "Oldest"]}
                  value={dateSort}
                  onChange={setDateSort}
                />
                <FilterDropdown
                  label="Department"
                  options={departmentOptions}
                  value={departmentFilter}
                  onChange={setDepartmentFilter}
                />
                <FilterDropdown
                  label="Status"
                  options={STATUSES}
                  value={statusFilter}
                  onChange={setStatusFilter}
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className="hover:bg-transparent">
                    {hg.headers.map((header) => (
                      <TableHead key={header.id} className="text-foreground font-semibold">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-10 text-muted-foreground">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between px-6 py-4 border-t border-border flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Row Per Page</span>
                <select
                  value={pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                  className="h-8 px-2 rounded-md border border-input bg-card text-sm text-foreground"
                >
                  {[5, 10, 20, 50].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span>Entries</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-input bg-card text-sm hover:bg-secondary transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {pageNumbers.map((p, i) =>
                  p === "…" ? (
                    <span key={`e-${i}`} className="w-9 h-9 inline-flex items-center justify-center text-muted-foreground">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => table.setPageIndex(p - 1)}
                      className={`w-9 h-9 inline-flex items-center justify-center rounded-md border text-sm transition ${
                        pageIndex + 1 === p
                          ? "bg-brand text-brand-foreground border-brand"
                          : "border-input bg-card text-foreground hover:bg-secondary"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-input bg-card text-sm hover:bg-secondary transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete RTI record?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete the selected RTI entry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) {
                  deleteMutation.mutate(deleteTarget.id);
                }
              }}
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RTIList;
