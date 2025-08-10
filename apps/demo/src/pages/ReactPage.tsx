import { useState } from 'react';
import { Card, Dialog, Button } from '@glaze/react';
import '@glaze/components/dist/styles/tokens.css';
import '@glaze/components/dist/styles/components.css';

export function ReactPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">React Components</h2>
        <p className="text-white/70">
          Using Glaze components with React wrappers
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Glass Card Example */}
        <Card variant="glass" size="lg" tone="primary">
          <h3 className="text-xl font-bold text-white mb-3">Glass Card</h3>
          <p className="text-white/80 mb-4">
            This is a glass morphism card component with beautiful blur effects 
            and semi-transparent background.
          </p>
          <Button 
            variant="solid" 
            tone="primary"
            onClick={() => setDialogOpen(true)}
          >
            Open Dialog
          </Button>
        </Card>

        {/* Solid Card Example */}
        <Card variant="solid" size="lg" tone="accent">
          <h3 className="text-xl font-bold mb-3">Solid Card</h3>
          <p className="text-white/80 mb-4">
            A solid card variant with opaque background and strong presence. 
            Perfect for important content.
          </p>
          <div className="flex gap-2">
            <Button variant="glass" tone="accent">
              Glass Button
            </Button>
            <Button variant="ghost" tone="accent">
              Ghost Button
            </Button>
          </div>
        </Card>

        {/* Feature Card */}
        <Card variant="glass" size="md">
          <h3 className="text-lg font-semibold text-white mb-2">
            🚀 Fast Performance
          </h3>
          <p className="text-white/70">
            Built with Lit Elements for optimal performance and small bundle size.
          </p>
        </Card>

        {/* Feature Card */}
        <Card variant="glass" size="md">
          <h3 className="text-lg font-semibold text-white mb-2">
            ♿ Accessibility First
          </h3>
          <p className="text-white/70">
            Full keyboard navigation, ARIA attributes, and screen reader support.
          </p>
        </Card>

        {/* Feature Card */}
        <Card variant="glass" size="md">
          <h3 className="text-lg font-semibold text-white mb-2">
            🎨 Design Tokens
          </h3>
          <p className="text-white/70">
            Consistent theming with Style Dictionary and CSS custom properties.
          </p>
        </Card>

        {/* Feature Card */}
        <Card variant="glass" size="md">
          <h3 className="text-lg font-semibold text-white mb-2">
            ⚛️ Framework Ready
          </h3>
          <p className="text-white/70">
            Native web components work seamlessly with React, Vue, and vanilla JS.
          </p>
        </Card>
      </div>

      {/* Dialog Component */}
      <Dialog
        open={dialogOpen}
        onGlzDialogClose={() => setDialogOpen(false)}
        variant="glass"
        label="Example Dialog"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">React Dialog</h2>
          <p className="text-white/80 mb-6">
            This dialog demonstrates the glass morphism effect with backdrop blur 
            and focus trap functionality. Press Escape or click outside to close.
          </p>
          <div className="flex gap-2 justify-end">
            <Button 
              variant="ghost" 
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="solid" 
              tone="primary"
              onClick={() => setDialogOpen(false)}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}