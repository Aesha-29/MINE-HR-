import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { surveyAPI } from "../../services/apiService";
import { getCurrentUserId } from "../../utils/auth";

export default function Quiz() {
	const [surveys, setSurveys] = useState<any[]>([]);
	const [surveyId, setSurveyId] = useState<number | null>(null);
	const [survey, setSurvey] = useState<any>(null);
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const res = await surveyAPI.getAll({ status: "Active" });
				const list = Array.isArray(res.data) ? res.data : [];
				setSurveys(list);
				if (list[0]?.id) setSurveyId(list[0].id);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	useEffect(() => {
		const loadOne = async () => {
			if (!surveyId) return;
			const res = await surveyAPI.getById(surveyId);
			setSurvey(res.data);
			setAnswers({});
		};
		loadOne();
	}, [surveyId]);

	const requiredMissing = useMemo(() => {
		if (!survey?.questions) return false;
		return survey.questions.some((q: any) => q.isRequired && !String(answers[q.id] || "").trim());
	}, [answers, survey]);

	const submit = async () => {
		if (!survey?.id) return;
		if (requiredMissing) return alert("Please answer all required questions.");

		const payload = {
			surveyId: survey.id,
			employeeId: getCurrentUserId(),
			answers: Object.entries(answers).map(([questionId, answerText]) => ({
				questionId: Number(questionId),
				answerText,
			})),
		};

		try {
			await surveyAPI.submitResponse(payload);
			alert("Response submitted successfully.");
			setAnswers({});
		} catch (e: any) {
			alert(e.response?.data?.message || "Failed to submit response");
		}
	};

	return (
		<div style={{ padding: "24px 32px" }}>
			<h2 className="page-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
				<MessageSquare size={22} /> Survey Quiz
			</h2>
			<p className="page-subtitle">Answer active surveys and submit your responses.</p>

			{loading && <div className="glass-card">Loading surveys...</div>}

			{!loading && (
				<>
					<div className="glass-card" style={{ marginBottom: 16 }}>
						<label className="input-label">Select Survey</label>
						<select className="select-modern" value={surveyId || ""} onChange={(e) => setSurveyId(Number(e.target.value))}>
							{surveys.map((s) => (
								<option key={s.id} value={s.id}>{s.title}</option>
							))}
						</select>
					</div>

					{survey && (
						<div className="glass-card">
							<h3 style={{ marginTop: 0 }}>{survey.title}</h3>
							<p style={{ color: "var(--text-muted)" }}>{survey.description || ""}</p>

							<div style={{ display: "grid", gap: 14, marginTop: 16 }}>
								{(survey.questions || []).map((q: any, i: number) => (
									<div key={q.id}>
										<label className="input-label">{i + 1}. {q.questionText}{q.isRequired ? " *" : ""}</label>
										<textarea
											className="input-modern"
											style={{ minHeight: 72 }}
											value={answers[q.id] || ""}
											onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
											placeholder="Enter your response"
										/>
									</div>
								))}
							</div>

							<div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
								<button className="btn btn-primary" onClick={submit}><Send size={16} /> Submit Response</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}