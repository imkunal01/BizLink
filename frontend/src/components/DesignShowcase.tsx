import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function DesignShowcase() {
  return (
    <div className="p-12 space-y-12 bg-white">
      {/* Color Palette */}
      <div>
        <h2 className="text-3xl mb-6">Color Palette</h2>
        <div className="grid grid-cols-5 gap-4">
          <div>
            <div className="h-24 rounded-2xl bg-gradient-to-br from-lime-400 to-teal-500 mb-2" />
            <p className="text-sm">Lime-Teal</p>
            <p className="text-xs text-muted-foreground">Primary</p>
          </div>
          <div>
            <div className="h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-2" />
            <p className="text-sm">Blue-Purple</p>
            <p className="text-xs text-muted-foreground">Secondary</p>
          </div>
          <div>
            <div className="h-24 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 mb-2" />
            <p className="text-sm">Pink-Orange</p>
            <p className="text-xs text-muted-foreground">Accent</p>
          </div>
          <div>
            <div className="h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 mb-2" />
            <p className="text-sm">Purple-Pink</p>
            <p className="text-xs text-muted-foreground">Accent</p>
          </div>
          <div>
            <div className="h-24 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-200 mb-2" />
            <p className="text-sm">Soft Gray</p>
            <p className="text-xs text-muted-foreground">Neutral</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div>
        <h2 className="text-3xl mb-6">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-gradient-to-r from-lime-400 to-teal-400 text-black hover:shadow-lg">
            Primary Button
          </Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600">
            Large Button
          </Button>
          <Button size="sm">Small Button</Button>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-3xl mb-6">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge className="bg-lime-400 text-black border-0">Trending</Badge>
          <Badge className="bg-blue-100 text-blue-700 border-0">New</Badge>
          <Badge className="bg-green-100 text-green-700 border-0">In Stock</Badge>
          <Badge className="bg-red-100 text-red-700 border-0">Sale</Badge>
          <Badge className="bg-purple-100 text-purple-700 border-0">Premium</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h2 className="text-3xl mb-6">Card Styles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover-lift" style={{ boxShadow: 'var(--shadow-md)' }}>
            <h3 className="mb-2">Standard Card</h3>
            <p className="text-sm text-muted-foreground">Clean card with subtle shadow and rounded corners</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
            <h3 className="mb-2">Gradient Card</h3>
            <p className="text-sm text-muted-foreground">Soft gradient background for emphasis</p>
          </div>
          <div className="neumorphic rounded-2xl p-6 bg-gray-50">
            <h3 className="mb-2">Neumorphic Card</h3>
            <p className="text-sm text-muted-foreground">Soft 3D effect with light and shadow</p>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h2 className="text-3xl mb-6">Typography</h2>
        <div className="space-y-4">
          <h1>Heading 1 - Large Display Text</h1>
          <h2>Heading 2 - Section Headers</h2>
          <h3>Heading 3 - Subsections</h3>
          <h4>Heading 4 - Card Titles</h4>
          <p>Paragraph - Regular body text with good readability and line spacing</p>
          <p className="text-sm text-muted-foreground">Small text - Muted foreground color for secondary information</p>
        </div>
      </div>
    </div>
  );
}
