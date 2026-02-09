import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Instagram, Twitter, Phone, Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground/[0.03] border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">BHU-Quick-Food</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The fastest food delivery platform built exclusively for Bingham University students.
              Order from your favorite campus cafeterias.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60">
              <ShieldCheck className="w-3 h-3" />
              Security-first system built by a cybersecurity student
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Explore Cafeterias</Link>
              <Link to="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Cart</Link>
              <Link to="/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">Order History</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About BHU-Quick-Food</Link>
              <Link to="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Profile</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Contact Us</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:support@bhuquickfood.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> support@bhuquickfood.com
              </a>
              <a href="tel:+2348012345678" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> +234 801 234 5678
              </a>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            © 2026 BHU-Quick-Food
          </p>
          <p className="text-xs text-muted-foreground/60">
            Created for Bingham University Students Only
          </p>
          <p className="text-xs text-muted-foreground/50">
            Built with ❤️ and a security-first mindset by emmy-brain-codes 🛰️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
