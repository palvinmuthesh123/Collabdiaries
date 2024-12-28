export enum LinkType {
  hyperlink = 'hyperlink',
  linktree = 'linktree',
}

export enum BaseStatus {
  active = 'active',
  inactive = 'inactive',
}

export enum NotificationMethod {
  email = 'email',
  push = 'push',
  in_app = 'in_app',
}

export enum NotificationType {
  POSTS = 'Posts',
  CONNECTS = 'Connects',
  REMINDERS = 'Reminders',
  LABELS = 'Labels',
  NEARBY_INFLUENCERS = 'Nearby Influencers',
  NEARBY_BRANDS = 'Nearby Brands',
  MESSAGES = 'Messages',
  UNKNOWN_MESSAGES = 'UnknownMessages',
}
export enum UserStatus {
  hold='hold',
  hide='hide',
  disable='disable',
  active='active',
}

export enum BidStatus {
  received= "received",
  completed= "completed",
  accepted= "accepted",
  rejected= "rejected",
  terminated= "terminated"
}

export enum ReportType {
  account = 'account',
  post = 'post',
}

export enum ReportStatus {
  Pending = 'Pending',
  Reviewed = 'Reviewed',
  Resolved = 'Resolved',
}