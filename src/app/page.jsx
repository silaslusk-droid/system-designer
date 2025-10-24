import InputPanel from '../components/generator/InputPanel';
import PreviewPanel from '../components/generator/PreviewPanel';

export default function GeneratorPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <InputPanel />
      <PreviewPanel />
    </div>
  );
}
