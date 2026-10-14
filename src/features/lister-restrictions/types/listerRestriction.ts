export interface ListerRestriction {
  userId: string;
  restricted: boolean;
  canLogin: boolean;
  canBrowseListings: boolean;
  canCreateListings: boolean;
  restrictionId: string | null;
  reportId: string | null;
  reference: string | null;
  sourceListingId: string | null;
  sourceListingTitle: string | null;
  reason: string | null;
  restrictedAt: string | null;
  appealAllowed: boolean;
  latestAppealStatus: string | null;
  message: string | null;
}
