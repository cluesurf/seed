export interface Term {
  shape: any
}

export interface IdentityType {
  space: Term
  left: Term
  right: Term
}

export interface HomotopyTypeTheory {
  identity: IdentityType
}
