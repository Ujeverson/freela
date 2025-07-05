import React from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarProvider } from "@/components/ui/sidebar";
import { BarChart3, MessageSquare, Users, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Mensagens", url: "/mensagens", icon: MessageSquare },
  { title: "Corretores", url: "/corretores", icon: Users },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar className="border-r border-slate-200 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Analytics Pro</h2>
                <p className="text-xs text-slate-500">Dashboard de KPIs</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-3">
            <nav className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium text-base hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 ${location.pathname === item.url ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm' : 'text-slate-600'}`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </SidebarContent>
          <SidebarFooter className="border-t border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                <span className="text-slate-600 font-semibold text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">Usuário</p>
                <p className="text-xs text-slate-500 truncate">Analista de Dados</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 flex flex-col min-h-screen">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
