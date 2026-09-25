from unittest.mock import Mock

from app.services import project_dna_engine


# ============================================================
# PROJECT COMPLEXITY TESTS
# ============================================================

def test_calculate_project_complexity_basic():
    result = project_dna_engine.calculate_project_complexity(
        skill_count=2,
        member_count=2,
        outcome_count=2,
        evidence_count=2,
    )

    # 2*15 + 2*10 + 2*10 + 2*5 = 80
    assert result == 80.0


def test_calculate_project_complexity_caps_each_dimension():
    result = project_dna_engine.calculate_project_complexity(
        skill_count=10,
        member_count=10,
        outcome_count=10,
        evidence_count=10,
    )

    # Each dimension is capped:
    # skill=40, members=20, outcomes=20, evidence=20
    assert result == 100.0


def test_calculate_project_complexity_zero_counts():
    result = project_dna_engine.calculate_project_complexity(
        skill_count=0,
        member_count=0,
        outcome_count=0,
        evidence_count=0,
    )

    assert result == 0.0


# ============================================================
# OUTCOME SCORE TESTS
# ============================================================

def test_calculate_outcome_score_with_scores():
    outcomes = [
        Mock(score=80),
        Mock(score=60),
        Mock(score=100),
    ]

    result = project_dna_engine.calculate_outcome_score(outcomes)

    assert result == 80.0


def test_calculate_outcome_score_ignores_none_scores():
    outcomes = [
        Mock(score=80),
        Mock(score=None),
        Mock(score=60),
    ]

    result = project_dna_engine.calculate_outcome_score(outcomes)

    assert result == 70.0


def test_calculate_outcome_score_without_scores():
    outcomes = [
        Mock(score=None),
        Mock(score=None),
    ]

    result = project_dna_engine.calculate_outcome_score(outcomes)

    assert result == 0.0


# ============================================================
# EVIDENCE SCORE TESTS
# ============================================================

def test_calculate_evidence_score():
    assert project_dna_engine.calculate_evidence_score(1) == 20.0
    assert project_dna_engine.calculate_evidence_score(3) == 60.0
    assert project_dna_engine.calculate_evidence_score(5) == 100.0


def test_calculate_evidence_score_caps_at_100():
    result = project_dna_engine.calculate_evidence_score(10)

    assert result == 100.0


def test_calculate_evidence_score_zero():
    result = project_dna_engine.calculate_evidence_score(0)

    assert result == 0.0


# ============================================================
# PROJECT DNA SCORE TESTS
# ============================================================

def test_calculate_project_dna_score():
    result = project_dna_engine.calculate_project_dna_score(
        complexity_score=80,
        outcome_score=70,
        evidence_score=60,
    )

    # 80*0.40 + 70*0.35 + 60*0.25
    # = 32 + 24.5 + 15
    # = 71.5
    assert result == 71.5


def test_calculate_project_dna_score_caps_at_100():
    result = project_dna_engine.calculate_project_dna_score(
        complexity_score=100,
        outcome_score=100,
        evidence_score=100,
    )

    assert result == 100.0


# ============================================================
# PROJECT CLASSIFICATION TESTS
# ============================================================

def test_classify_project_boundaries():
    assert project_dna_engine.classify_project(85) == "high-impact"
    assert project_dna_engine.classify_project(84.99) == "advanced"

    assert project_dna_engine.classify_project(70) == "advanced"
    assert project_dna_engine.classify_project(69.99) == "developing"

    assert project_dna_engine.classify_project(50) == "developing"
    assert project_dna_engine.classify_project(49.99) == "basic"

    assert project_dna_engine.classify_project(30) == "basic"
    assert project_dna_engine.classify_project(29.99) == "early-stage"


# ============================================================
# PROJECT INSIGHTS TESTS
# ============================================================

def test_generate_project_insights_multidisciplinary_large_collaboration():
    insights = project_dna_engine.generate_project_insights(
        skill_count=5,
        member_count=5,
        outcome_count=2,
        evidence_count=5,
        outcome_score=80,
    )

    assert len(insights) == 4
    assert "Project demonstrates multidisciplinary skill usage." in insights
    assert "Project has a relatively large collaboration structure." in insights
    assert "Project outcomes show strong measurable results." in insights
    assert "Project has strong supporting evidence." in insights


def test_generate_project_insights_multiple_skills_collaboration():
    insights = project_dna_engine.generate_project_insights(
        skill_count=2,
        member_count=2,
        outcome_count=1,
        evidence_count=2,
        outcome_score=60,
    )

    assert "Project combines multiple technical or domain skills." in insights
    assert "Project demonstrates collaborative development." in insights
    assert "Project outcomes are present but could be strengthened." in insights
    assert "Project has some supporting evidence." in insights


def test_generate_project_insights_limited_project():
    insights = project_dna_engine.generate_project_insights(
        skill_count=1,
        member_count=1,
        outcome_count=0,
        evidence_count=0,
        outcome_score=0,
    )

    assert "Project currently demonstrates limited skill diversity." in insights
    assert "Project has limited collaboration evidence." in insights
    assert "No measurable project outcomes have been recorded yet." in insights
    assert "Project requires stronger supporting evidence." in insights


# ============================================================
# ANALYZE PROJECT DNA TESTS
# ============================================================

def test_analyze_project_dna_returns_none_for_missing_project():
    db = Mock()

    project_query = Mock()
    project_query.filter.return_value.first.return_value = None

    db.query.return_value = project_query

    result = project_dna_engine.analyze_project_dna(
        db=db,
        project_id=999,
    )

    assert result is None


def test_analyze_project_dna_generates_complete_analysis():
    db = Mock()

    # Project
    project = Mock()
    project.id = 1
    project.title = "NEXUS AI Platform"

    project_query = Mock()
    project_query.filter.return_value.first.return_value = project

    # 3 skills
    skills = [
        Mock(),
        Mock(),
        Mock(),
    ]

    skills_query = Mock()
    skills_query.filter.return_value.all.return_value = skills

    # 2 members
    members = [
        Mock(),
        Mock(),
    ]

    members_query = Mock()
    members_query.filter.return_value.all.return_value = members

    # 2 outcomes
    outcomes = [
        Mock(score=80),
        Mock(score=60),
    ]

    outcomes_query = Mock()
    outcomes_query.filter.return_value.all.return_value = outcomes

    # 3 evidence items
    evidence = [
        Mock(),
        Mock(),
        Mock(),
    ]

    evidence_query = Mock()
    evidence_query.filter.return_value.all.return_value = evidence

    db.query.side_effect = [
        project_query,
        skills_query,
        members_query,
        outcomes_query,
        evidence_query,
    ]

    result = project_dna_engine.analyze_project_dna(
        db=db,
        project_id=1,
    )

    assert result is not None

    assert result["project_id"] == 1
    assert result["project_title"] == "NEXUS AI Platform"

    assert result["skill_count"] == 3
    assert result["member_count"] == 2
    assert result["outcome_count"] == 2
    assert result["evidence_count"] == 3

    # Complexity:
    # skills = 3*15 = 45 -> capped at 40
    # members = 2*10 = 20
    # outcomes = 2*10 = 20
    # evidence = 3*5 = 15
    # total = 95
    assert result["complexity_score"] == 95.0

    # Outcomes = (80 + 60) / 2
    assert result["outcome_score"] == 70.0

    # Evidence = 3*20
    assert result["evidence_score"] == 60.0

    # DNA = 95*0.40 + 70*0.35 + 60*0.25
    # = 38 + 24.5 + 15
    # = 77.5
    assert result["dna_score"] == 77.5

    assert result["classification"] == "advanced"

    assert len(result["insights"]) == 4