import BasicObject from "../core/basic_object.coffee"
import ManagedAttachment from "./managed_attachment.coffee"

export default class AttachmentManager extends BasicObject
  constructor: (attachments = []) ->
    @managedAttachments = {}
    @manageAttachment(attachment) for attachment in attachments

  getAttachments: ->
    attachment for id, attachment of @managedAttachments

  manageAttachment: (attachment) ->
    @managedAttachments[attachment.id] ?= new ManagedAttachment this, attachment

  attachmentIsManaged: (attachment) ->
    attachment.id of @managedAttachments

  requestRemovalOfAttachment: (attachment) ->
    if @attachmentIsManaged(attachment)
      @delegate?.attachmentManagerDidRequestRemovalOfAttachment?(attachment)

  unmanageAttachment: (attachment) ->
    managedAttachment = @managedAttachments[attachment.id]
    delete @managedAttachments[attachment.id]
    managedAttachment
