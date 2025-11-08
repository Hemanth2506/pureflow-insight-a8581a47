import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: { name: string; email: string; phone: string } | null;
}

export function ProfileModal({ isOpen, onClose, onLogout, user }: ProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">User Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {user ? (
            <>
              <p className="text-foreground"><strong>Name:</strong> {user.name}</p>
              <p className="text-foreground"><strong>Email:</strong> {user.email}</p>
              <p className="text-foreground"><strong>Phone:</strong> {user.phone}</p>
            </>
          ) : (
            <p className="text-muted-foreground">Not logged in.</p>
          )}
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onLogout} className="bg-primary hover:bg-secondary">
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
