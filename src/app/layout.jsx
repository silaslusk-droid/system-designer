import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
