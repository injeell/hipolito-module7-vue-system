export function getFeedbackTitle(action) {
  if (action === 'update') {
    return 'Student Successfully Added'
  }

  if (action === 'delete') {
    return 'Record Deleted'
  }

  return 'Student Successfully Added'
}