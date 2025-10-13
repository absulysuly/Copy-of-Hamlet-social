import React, { useEffect, useMemo, useState } from 'react';
import type {
  CandidatePayload,
  CandidateRecord,
  CandidateStatus,
  CandidateStats,
} from '../services/candidatePortalService.ts';
import {
  addCandidate,
  bulkImport,
  getCandidates,
  getStats,
  sendInvitations,
  updateCandidateStatus,
} from '../services/candidatePortalService.ts';
import { Language } from '../types.ts';
import { UI_TEXT } from '../translations.ts';

type InvitationTab = 'add' | 'bulk' | 'list';

interface CandidateFormState extends CandidatePayload {
  district: string;
  party: string;
  facebookUrl: string;
  notes: string;
}

const initialFormState: CandidateFormState = {
  name: '',
  phone: '',
  province: '',
  district: '',
  party: '',
  facebookUrl: '',
  notes: '',
};

interface InvitationConsoleProps {
  language: Language;
}

const InvitationConsole: React.FC<InvitationConsoleProps> = ({ language }) => {
  const texts = UI_TEXT[language];
  const dir = language === 'ar' || language === 'ku' ? 'rtl' : 'ltr';
  const locale = language === 'ku' ? 'ku' : language;
  const commonTexts = texts.common;
  const invitationTexts = texts.invitations;

  const managementHeader = invitationTexts.management_header ?? texts.inviteTitle;
  const managementDescription = invitationTexts.management_description ?? texts.inviteDescription;
  const tabAddLabel = invitationTexts.conversations_tab ?? texts.inviteTabAdd;
  const tabBulkLabel = invitationTexts.invitations_tab ?? texts.inviteTabBulk;
  const tabListLabel = invitationTexts.requests_tab ?? texts.inviteTabList;
  const addTitle = invitationTexts.add_title ?? texts.inviteAddTitle;
  const nameLabel = invitationTexts.name_label ?? texts.inviteAddNameLabel;
  const phoneLabel = invitationTexts.phone_label ?? texts.inviteAddPhoneLabel;
  const provinceLabel = invitationTexts.province_label ?? texts.inviteAddProvinceLabel;
  const districtLabel = invitationTexts.district_label ?? texts.inviteAddDistrictLabel;
  const partyLabel = invitationTexts.party_label ?? texts.inviteAddPartyLabel;
  const facebookLabel = invitationTexts.facebook_label ?? texts.inviteAddFacebookLabel;
  const notesLabel = invitationTexts.notes_label ?? texts.inviteAddNotesLabel;
  const addSubmitLabel = invitationTexts.submit_label ?? texts.inviteAddSubmit;
  const addSubmittingLabel = invitationTexts.submitting_label ?? texts.inviteAddSubmitting;
  const bulkTitle = invitationTexts.bulk_title ?? texts.inviteBulkTitle;
  const bulkInstruction = invitationTexts.bulk_instruction ?? texts.inviteBulkInstruction;
  const bulkPlaceholder = invitationTexts.bulk_placeholder ?? texts.inviteBulkPlaceholder;
  const bulkSubmitLabel = invitationTexts.bulk_submit ?? texts.inviteBulkSubmit;
  const bulkSubmittingLabel = invitationTexts.bulk_submitting ?? texts.inviteBulkSubmitting;
  const bulkHelper = invitationTexts.bulk_helper ?? texts.inviteBulkHelper;
  const listTitle = invitationTexts.list_title ?? texts.inviteListTitle;
  const listMessagePlaceholder = invitationTexts.list_message_placeholder ?? texts.inviteListMessagePlaceholder;
  const listSendAllLabel = invitationTexts.send_invitation ?? texts.inviteListSendAll;
  const listSendingLabel = invitationTexts.send_in_progress ?? texts.inviteListSending;
  const filterAllLabel = commonTexts.all ?? texts.inviteFilterAll;
  const filterPendingLabel = invitationTexts.pending ?? texts.inviteFilterPending;
  const filterAcceptedLabel = invitationTexts.accepted ?? texts.inviteFilterInterested;
  const filterRejectedLabel = invitationTexts.rejected ?? texts.inviteFilterInvited;
  const tableNameHeader = invitationTexts.sender ?? texts.inviteTableNameHeader;
  const tablePhoneHeader = invitationTexts.receiver ?? texts.inviteTablePhoneHeader;
  const tableProvinceHeader = invitationTexts.province ?? texts.inviteTableProvinceHeader;
  const tablePartyHeader = invitationTexts.party ?? texts.inviteTablePartyHeader;
  const tableInvitationHeader = invitationTexts.date ?? texts.inviteTableInvitationHeader;
  const tableStatusHeader = invitationTexts.status ?? texts.inviteTableStatusHeader;
  const tableActionsHeader = invitationTexts.actions ?? texts.inviteTableActionsHeader;
  const facebookLinkLabel = invitationTexts.facebook_link ?? texts.inviteFacebookLink;
  const districtTemplate = invitationTexts.district_template ?? texts.inviteDistrictLabel;
  const partyIndependentLabel = invitationTexts.independent ?? texts.invitePartyIndependent;
  const invitationSentLabel = invitationTexts.sent_badge ?? texts.inviteInvitationSent;
  const invitationPendingLabel = invitationTexts.pending_badge ?? texts.inviteInvitationPending;
  const statsTotalLabel = invitationTexts.total_label ?? texts.inviteStatTotal;
  const statsInvitedLabel = invitationTexts.sent_label ?? texts.inviteStatInvited;
  const statsRespondedLabel = invitationTexts.responded_label ?? texts.inviteStatResponded;
  const statsResponseRateLabel = invitationTexts.response_rate_label ?? texts.inviteStatResponseRate;

  const [activeTab, setActiveTab] = useState<InvitationTab>('add');
  const [formState, setFormState] = useState<CandidateFormState>(initialFormState);
  const [bulkInput, setBulkInput] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);
  const [stats, setStats] = useState<CandidateStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const pendingStatuses: CandidateStatus[] = ['new', 'contacted'];

  const statusLabels = useMemo<Record<CandidateStatus, string>>(
    () => ({
      new: invitationTexts.status_new ?? invitationTexts.pending ?? texts.inviteStatusNew,
      contacted: invitationTexts.status_contacted ?? invitationTexts.sent_invitations ?? texts.inviteStatusContacted,
      interested: invitationTexts.status_interested ?? invitationTexts.accepted ?? texts.inviteStatusInterested,
      'not-interested': invitationTexts.status_not_interested ?? invitationTexts.rejected ?? texts.inviteStatusNotInterested,
    }),
    [invitationTexts, texts],
  );

  const statusOptions = useMemo(
    () =>
      (Object.entries(statusLabels) as [CandidateStatus, string][]).map(([value, label]) => ({
        value,
        label,
      })),
    [statusLabels],
  );

  const formatCount = (template: string, count: number) => {
    const formattedCount = count.toLocaleString(locale);
    return template.includes('{count}') ? template.replace('{count}', formattedCount) : template;
  };

  const formatRate = (template: string, rate: number) => {
    const formattedRate = `${rate}%`;
    return template.includes('{rate}') ? template.replace('{rate}', formattedRate) : template;
  };

  useEffect(() => {
    void refreshData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [list, statistics] = await Promise.all([getCandidates(), getStats()]);
      setCandidates(list);
      setStats(statistics);
    } catch (error) {
      console.error(error);
      setFeedback(texts.inviteFeedbackErrorLoading);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormField = (field: keyof CandidateFormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCandidate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!formState.name || !formState.phone || !formState.province) {
      setFeedback(texts.inviteFeedbackAddValidation);
      return;
    }

    const payload: CandidatePayload = {
      name: formState.name.trim(),
      phone: formState.phone.trim(),
      province: formState.province.trim(),
      district: formState.district.trim() || undefined,
      party: formState.party.trim() || undefined,
      facebookUrl: formState.facebookUrl.trim() || undefined,
      notes: formState.notes.trim() || undefined,
    };

    try {
      setIsLoading(true);
      const record = await addCandidate(payload);
      setCandidates(prev => [record, ...prev]);
      setFormState(initialFormState);
      setFeedback(texts.inviteFeedbackAddSuccess);
      void refreshData();
    } catch (error) {
      console.error(error);
      setFeedback((error as Error).message || texts.inviteFeedbackAddError);
    } finally {
      setIsLoading(false);
    }
  };

  const parseBulkInput = (): CandidatePayload[] => {
    const rows = bulkInput
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return rows.map((line, index) => {
      const [name, phone, province, district, party, facebookUrl, notes] = line.split(',');
      if (!name || !phone || !province) {
        throw new Error(texts.inviteFeedbackBulkRowError.replace('{index}', (index + 1).toString()));
      }
      return {
        name: name.trim(),
        phone: phone.trim(),
        province: province.trim(),
        district: district?.trim(),
        party: party?.trim(),
        facebookUrl: facebookUrl?.trim(),
        notes: notes?.trim(),
      };
    });
  };

  const handleBulkImport = async () => {
    setFeedback(null);

    try {
      const records = parseBulkInput();
      if (records.length === 0) {
        setFeedback(texts.inviteFeedbackBulkEmpty);
        return;
      }
      setIsLoading(true);
      const imported = await bulkImport(records);
      setBulkInput('');
      setFeedback(texts.inviteFeedbackBulkSuccess.replace('{count}', imported.toString()));
      void refreshData();
    } catch (error) {
      console.error(error);
      setFeedback((error as Error).message || texts.inviteFeedbackBulkError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendInvitations = async () => {
    setFeedback(null);

    const pending = candidates
      .filter(candidate => pendingStatuses.includes(candidate.status) || !candidate.invitationSent)
      .map(candidate => candidate.id);
    if (pending.length === 0) {
      setFeedback(texts.inviteFeedbackSendNoPending);
      return;
    }

    if (!window.confirm(texts.inviteFeedbackSendConfirm.replace('{count}', pending.length.toString()))) {
      return;
    }

    try {
      setIsLoading(true);
      const sent = await sendInvitations(pending, customMessage.trim() || undefined);
      setFeedback(texts.inviteFeedbackSendSuccess.replace('{count}', sent.toString()));
      setCustomMessage('');
      void refreshData();
    } catch (error) {
      console.error(error);
      setFeedback((error as Error).message || texts.inviteFeedbackSendError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (candidateId: string, status: CandidateStatus) => {
    try {
      const updated = await updateCandidateStatus(candidateId, status);
      setCandidates(prev => prev.map(candidate => (candidate.id === candidateId ? updated : candidate)));
      void refreshData();
    } catch (error) {
      console.error(error);
      setFeedback((error as Error).message || texts.inviteFeedbackAddError);
    }
  };

  const filteredCandidates = useMemo(() => {
    switch (filter) {
      case 'pending':
        return candidates.filter(candidate => pendingStatuses.includes(candidate.status) || !candidate.invitationSent);
      case 'accepted':
        return candidates.filter(candidate => candidate.status === 'interested');
      case 'rejected':
        return candidates.filter(candidate => candidate.status === 'not-interested');
      default:
        return candidates;
    }
  }, [candidates, filter]);

  const renderStats = () => {
    if (!stats) {
      return null;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4 border border-primary/10">
          <div className="text-sm text-theme-text-muted">{formatCount(statsTotalLabel, stats.total)}</div>
          <div className="text-3xl font-bold text-theme-text-base">{stats.total.toLocaleString(locale)}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-primary/10">
          <div className="text-sm text-theme-text-muted">{formatCount(statsInvitedLabel, stats.invited)}</div>
          <div className="text-3xl font-bold text-theme-text-base">{stats.invited.toLocaleString(locale)}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-primary/10">
          <div className="text-sm text-theme-text-muted">{formatCount(statsRespondedLabel, stats.responded)}</div>
          <div className="text-3xl font-bold text-theme-text-base">{stats.responded.toLocaleString(locale)}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-primary/10">
          <div className="text-sm text-theme-text-muted">{formatRate(statsResponseRateLabel, stats.responseRate)}</div>
          <div className="text-3xl font-bold text-theme-text-base">{stats.responseRate.toLocaleString(locale)}%</div>
        </div>
      </div>
    );
  };

  const renderFilterBar = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        type="button"
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
          filter === 'all' ? 'bg-primary text-on-primary shadow' : 'bg-white border text-theme-text-muted'
        }`}
      >
        {filterAllLabel}
      </button>
      <button
        type="button"
        onClick={() => setFilter('pending')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
          filter === 'pending' ? 'bg-primary text-on-primary shadow' : 'bg-white border text-theme-text-muted'
        }`}
      >
        {filterPendingLabel}
      </button>
      <button
        type="button"
        onClick={() => setFilter('accepted')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
          filter === 'accepted' ? 'bg-primary text-on-primary shadow' : 'bg-white border text-theme-text-muted'
        }`}
      >
        {filterAcceptedLabel}
      </button>
      <button
        type="button"
        onClick={() => setFilter('rejected')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
          filter === 'rejected' ? 'bg-primary text-on-primary shadow' : 'bg-white border text-theme-text-muted'
        }`}
      >
        {filterRejectedLabel}
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6" dir={dir}>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-theme-text-base mb-2">{managementHeader}</h1>
        <p className="text-theme-text-muted">{managementDescription}</p>
      </header>

      {renderStats()}

      <div className="mb-6 bg-white rounded-xl border border-primary/10 shadow-sm p-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            activeTab === 'add' ? 'bg-primary text-on-primary shadow' : 'bg-white text-theme-text-muted'
          }`}
        >
          {texts.inviteTabAdd}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('bulk')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            activeTab === 'bulk' ? 'bg-primary text-on-primary shadow' : 'bg-white text-theme-text-muted'
          }`}
        >
          {texts.inviteTabBulk}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            activeTab === 'list' ? 'bg-primary text-on-primary shadow' : 'bg-white text-theme-text-muted'
          }`}
        >
          {texts.inviteTabList}
        </button>
      </div>

      {feedback && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          {feedback}
        </div>
      )}

      {activeTab === 'add' && (
        <section className="bg-white border border-primary/10 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-theme-text-base mb-4">{addTitle}</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddCandidate}>
            <div>
              <label className="block text-sm font-medium text-theme-text-muted mb-1">{nameLabel}</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/40"
                value={formState.name}
                onChange={event => updateFormField('name', event.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-text-muted mb-1">{phoneLabel}</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/40"
                value={formState.phone}
                onChange={event => updateFormField('phone', event.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-text-muted mb-1">{provinceLabel}</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/40"
                value={formState.province}
                onChange={event => updateFormField('province', event.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-text-muted mb-1">{districtLabel}</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/40"
                value={formState.district}
                onChange={event => updateFormField('district', event.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-text-muted mb-1">{partyLabel}</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/40"
                value={formState.party}
                onChange={event => updateFormField('party', event.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-text-muted mb-1">{facebookLabel}</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/40"
                value={formState.facebookUrl}
                onChange={event => updateFormField('facebookUrl', event.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-theme-text-muted mb-1">{notesLabel}</label>
              <textarea
                className="w-full min-h-[96px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/40"
                value={formState.notes}
                onChange={event => updateFormField('notes', event.target.value)}
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-primary text-on-primary rounded-lg shadow hover:brightness-110 disabled:opacity-50"
              >
                {isLoading ? addSubmittingLabel : addSubmitLabel}
              </button>
            </div>
          </form>
        </section>
      )}

      {activeTab === 'bulk' && (
        <section className="bg-white border border-primary/10 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-theme-text-base mb-4">{bulkTitle}</h2>
          <p className="text-sm text-theme-text-muted mb-4">
            {bulkInstruction}
          </p>
          <textarea
            className="w-full min-h-[200px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/40 mb-4"
            placeholder={bulkPlaceholder}
            value={bulkInput}
            onChange={event => setBulkInput(event.target.value)}
          />
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <button
              type="button"
              className="px-6 py-3 bg-primary text-on-primary rounded-lg shadow hover:brightness-110"
              onClick={handleBulkImport}
              disabled={isLoading}
            >
              {isLoading ? bulkSubmittingLabel : bulkSubmitLabel}
            </button>
            <div className="text-sm text-theme-text-muted">
              {bulkHelper}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'list' && (
        <section className="bg-white border border-primary/10 rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-theme-text-base">{listTitle}</h2>
            <div className="flex flex-wrap gap-3">
              <textarea
                className="min-h-[96px] w-full md:w-[320px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/40"
                placeholder={listMessagePlaceholder}
                value={customMessage}
                onChange={event => setCustomMessage(event.target.value)}
              />
              <button
                type="button"
                className="px-6 py-3 bg-primary text-on-primary rounded-lg shadow hover:brightness-110 disabled:opacity-50"
                onClick={handleSendInvitations}
                disabled={isLoading}
              >
                {isLoading ? listSendingLabel : listSendAllLabel}
              </button>
            </div>
          </div>

          {renderFilterBar()}

          <div className="overflow-x-auto rounded-xl border border-primary/10">
            <table className="min-w-full divide-y divide-primary/10">
              <thead className="bg-primary/5">
                <tr className="text-theme-text-muted">
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase">{tableNameHeader}</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase">{tablePhoneHeader}</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase">{tableProvinceHeader}</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase">{tablePartyHeader}</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase">{tableInvitationHeader}</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase">{tableStatusHeader}</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase">{tableActionsHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10 text-sm">
                {filteredCandidates.map(candidate => (
                  <tr key={candidate.id} className="hover:bg-primary/5">
                    <td className="px-4 py-3 text-theme-text-base">
                      <div className="font-semibold">{candidate.name}</div>
                      {candidate.facebookUrl && (
                        <a
                          className="text-primary text-xs"
                          href={candidate.facebookUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {facebookLinkLabel}
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3 text-theme-text-muted">
                      {candidate.phone}
                    </td>
                    <td className="px-4 py-3 text-theme-text-muted">
                      <div>{candidate.province}</div>
                      {candidate.district && (
                        <div className="text-xs">{districtTemplate.replace('{district}', candidate.district)}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-theme-text-muted">
                      {candidate.party || partyIndependentLabel}
                    </td>
                    <td className="px-4 py-3">
                      {candidate.invitationSent ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          {invitationSentLabel}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          {invitationPendingLabel}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        {statusLabels[candidate.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/40"
                        value={candidate.status}
                        onChange={event => handleStatusChange(candidate.id, event.target.value as CandidateStatus)}
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default InvitationConsole;
