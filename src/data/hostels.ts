export interface Hostel {
  id: string;
  name: string;
  deliveryFee: number;
  estimatedExtraTime: number; // extra minutes added to base delivery
}

export const hostels: Hostel[] = [
  { id: 'old-boys', name: 'Old Boys Hostel', deliveryFee: 200, estimatedExtraTime: 5 },
  { id: 'new-boys', name: 'New Boys Hostel', deliveryFee: 250, estimatedExtraTime: 7 },
  { id: 'newest-boys', name: 'Newest Boys Hostel', deliveryFee: 300, estimatedExtraTime: 10 },
  { id: 'old-girls', name: 'Old Girls Hostel', deliveryFee: 200, estimatedExtraTime: 5 },
  { id: 'new-girls-1', name: 'New Girls Hostel 1', deliveryFee: 250, estimatedExtraTime: 8 },
  { id: 'new-girls-2', name: 'New Girls Hostel 2', deliveryFee: 250, estimatedExtraTime: 8 },
  { id: 'new-girls-3', name: 'New Girls Hostel 3', deliveryFee: 300, estimatedExtraTime: 10 },
  { id: 'newest-girls', name: 'Newest Girls Hostel', deliveryFee: 350, estimatedExtraTime: 12 },
];
