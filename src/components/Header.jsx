import { Search, Moon, Sun, Download, ShieldAlert, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import useStore from '../lib/store';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { generateTailwindConfig, generateFigmaSVG } from '../lib/tokens';
import { auditAccessibility } from '../lib/ai';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';

export default function Header() {
  const {
    searchQuery,
    setSearchQuery,
    darkMode,
    toggleDarkMode,
    toggleSidebar,
    getActiveSystem,
  } = useStore();

  const [exportOpen, setExportOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [auditResults, setAuditResults] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const activeSystem = getActiveSystem();

  const handleExport = () => {
    setExportOpen(true);
  };

  const handleAudit = async () => {
    setAuditOpen(true);
    setIsAuditing(true);
    const results = await auditAccessibility(activeSystem);
    setAuditResults(results);
    setIsAuditing(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const tailwindConfig = activeSystem ? generateTailwindConfig(activeSystem) : null;
  const figmaSVG =
    activeSystem?.colors?.brand ? generateFigmaSVG(activeSystem.colors.brand) : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Design System Generator</h1>
        </div>

        <div className="flex flex-1 items-center justify-center px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search design systems or commands..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleAudit}>
            <ShieldAlert className="mr-2 h-4 w-4" />
            Audit Accessibility
          </Button>

          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Export Dialog */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Export Design System</DialogTitle>
            <DialogDescription>
              Export your design system for code (Tailwind) or design tools (Figma)
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="tailwind" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tailwind">Tailwind Config</TabsTrigger>
              <TabsTrigger value="figma">Figma SVG</TabsTrigger>
            </TabsList>

            <TabsContent value="tailwind" className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <pre className="overflow-x-auto text-xs">
                  {tailwindConfig
                    ? JSON.stringify(tailwindConfig, null, 2)
                    : 'No active design system'}
                </pre>
              </div>
              <Button
                onClick={() =>
                  copyToClipboard(
                    tailwindConfig ? JSON.stringify(tailwindConfig, null, 2) : ''
                  )
                }
                className="w-full"
              >
                Copy to Clipboard
              </Button>
            </TabsContent>

            <TabsContent value="figma" className="space-y-4">
              {figmaSVG ? (
                <>
                  <div className="rounded-md border p-4 bg-white">
                    <div dangerouslySetInnerHTML={{ __html: figmaSVG }} />
                  </div>
                  <Button onClick={() => copyToClipboard(figmaSVG)} className="w-full">
                    Copy SVG Code
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Copy this SVG and paste it directly into Figma to create color swatches with
                    proper layer names.
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground">No brand colors available to export</p>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Audit Dialog */}
      <Dialog open={auditOpen} onOpenChange={setAuditOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Accessibility Audit</DialogTitle>
            <DialogDescription>
              AI-powered analysis of your design system's accessibility
            </DialogDescription>
          </DialogHeader>

          {isAuditing ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Auditing your design system...</p>
            </div>
          ) : auditResults ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <Badge variant="destructive">{auditResults.summary.errors} Errors</Badge>
                <Badge variant="default">{auditResults.summary.warnings} Warnings</Badge>
                <Badge variant="secondary">{auditResults.summary.info} Info</Badge>
              </div>

              <div className="space-y-3">
                {auditResults.issues.map((issue, index) => (
                  <Alert
                    key={index}
                    variant={issue.severity === 'error' ? 'destructive' : 'default'}
                  >
                    <AlertTitle className="flex items-center gap-2">
                      <Badge
                        variant={
                          issue.severity === 'error'
                            ? 'destructive'
                            : issue.severity === 'warning'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {issue.severity}
                      </Badge>
                      {issue.component}
                    </AlertTitle>
                    <AlertDescription>
                      <p className="mt-2">
                        <strong>Issue:</strong> {issue.issue}
                      </p>
                      <p className="mt-1">
                        <strong>Recommendation:</strong> {issue.recommendation}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{issue.wcag}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </header>
  );
}
